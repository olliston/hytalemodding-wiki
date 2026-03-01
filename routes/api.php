<?php

Route::group([
    'prefix' => '/api',
    'middleware' => ['api.key'],
], function () {
    Route::get('/', fn () => response()->json(['message' => 'request success, your key works!']));
});

/*
 * Example of scope protection for API routes:
   Route::middleware('api.scope:read:mods')->group(function () {
        Route::get('/mods',        [\App\Http\Controllers\ModController::class, 'index']);
    });
*/
