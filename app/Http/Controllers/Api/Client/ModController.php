<?php

namespace App\Http\Controllers\Api\Client;

use App\Models\Mod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ModController extends ClientController
{
    /**
     * Display a listing of user's mods.
     */
    public function index()
    {
        $mods = Mod::all();

        return response()->json(
            $mods->map(function ($mod) {
                return [
                    'id' => $mod->id,
                    'name' => $mod->name,
                    'slug' => $mod->slug,
                    'description' => $mod->description,
                    'created_at' => $mod->created_at->toISOString(),
                    'updated_at' => $mod->updated_at->toISOString(),
                ];
            })
        );
    }

    /**
     * Display all the pages of a mod.
     */
    public function show(Request $request)
    {
        $mod_id = $request->route('mod');

        $mod = Mod::where('id', $mod_id)->firstOrFail();
        $pages = $mod->pages()->latest()->get()->map(function ($page) {
            return [
                'id' => $page->id,
                'name' => $page->name,
                'slug' => $page->slug,
            ];
        });

        return response()->json([
            'pages' => $pages,
        ]);
    }

    /**
     * Get the markdown contents of a specified page.
     */
    public function getPageContent(Request $request)
    {
        $mod_id = $request->route('mod');
        $page_slug = $request->route('page');

        $mod = Mod::where('id', $mod_id)->firstOrFail();
        $page = $mod->pages()->where('slug', $page_slug)->firstOrFail();

        return response()->json([
            'content' => $page->content,
        ]);
    }
}
