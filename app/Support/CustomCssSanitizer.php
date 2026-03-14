<?php

namespace App\Support;

final class CustomCssSanitizer
{
    /**
     * Patterns that are never allowed in user-provided CSS.
     *
     * These block style-tag breakouts, legacy script execution vectors,
     * and remote/protocol-based payloads that are not needed for theming.
     */
    private const FORBIDDEN_PATTERNS = [
        '/<\s*\/\s*style\b/i' => 'Custom CSS cannot contain closing style tags.',
        '/<\s*(?:script|iframe|object|embed|link|meta|img|svg|\?|!)/i' => 'Custom CSS cannot contain HTML or script-like markup.',
        '/@import\b/i' => 'Custom CSS cannot use @import.',
        '/expression\s*\(/i' => 'Custom CSS cannot use legacy CSS expressions.',
        '/\bbehavior\s*:/i' => 'Custom CSS cannot use legacy behavior properties.',
        '/-moz-binding\s*:/i' => 'Custom CSS cannot use -moz-binding.',
        '/(?:javascript|vbscript|data|file)\s*:/i' => 'Custom CSS cannot reference unsafe protocols.',
    ];

    public static function normalize(null|string $css): ?string
    {
        if ($css === null) {
            return null;
        }

        $css = str_replace(["\r\n", "\r"], "\n", $css);
        $css = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $css) ?? $css;
        $css = trim($css);

        return $css === '' ? null : $css;
    }

    /**
     * @return array<int, string>
     */
    public static function violations(null|string $css): array
    {
        $normalized = self::normalize($css);

        if ($normalized === null) {
            return [];
        }

        $violations = [];

        foreach (self::FORBIDDEN_PATTERNS as $pattern => $message) {
            if (preg_match($pattern, $normalized) === 1) {
                $violations[] = $message;
            }
        }

        return array_values(array_unique($violations));
    }

    public static function isSafe(null|string $css): bool
    {
        return self::violations($css) === [];
    }

    public static function sanitizeForOutput(null|string $css): ?string
    {
        $normalized = self::normalize($css);

        if ($normalized === null) {
            return null;
        }

        return self::isSafe($normalized) ? $normalized : null;
    }
}

