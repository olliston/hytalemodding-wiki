<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('mods', function (Blueprint $table) {
            $table->longText('custom_css')->nullable()->after('github_repository_path');
        });
    }

    public function down(): void
    {
        Schema::table('mods', function (Blueprint $table) {
            $table->dropColumn('custom_css');
        });
    }
};

