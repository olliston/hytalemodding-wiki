<?php

namespace App\Http\Middleware;

use App\Models\Mod;
use Closure;
use Illuminate\Http\Request;

class ResolveModByDomain
{
    /**
     * Resolve a verified mod for custom-domain requests and share it on the request.
     */
    public function handle(Request $request, Closure $next)
    {
        $host = strtolower($request->getHost());

        if (! self::isFirstPartyHost($host) && ! self::isLocalHost($host)) {
            $mod = Mod::query()
                ->where('custom_domain', $host)
                ->where('domain_verified', true)
                ->first();

            if ($mod) {
                $request->attributes->set('resolved_mod', $mod);
                app()->instance('resolved_mod', $mod);
            }
        }

        return $next($request);
    }

    public static function isFirstPartyHost(string $host): bool
    {
        $host = strtolower($host);

        $configured = array_filter([
            parse_url((string) config('app.url'), PHP_URL_HOST),
            config('app.domain'),
        ]);

        foreach ($configured as $firstPartyHost) {
            $firstPartyHost = strtolower((string) $firstPartyHost);
            if ($host === $firstPartyHost) {
                return true;
            }
        }

        return false;
    }

    public static function isLocalHost(string $host): bool
    {
        if (in_array($host, ['localhost', '127.0.0.1', '::1'], true)) {
            return true;
        }

        return str_ends_with($host, '.localhost');
    }
}

