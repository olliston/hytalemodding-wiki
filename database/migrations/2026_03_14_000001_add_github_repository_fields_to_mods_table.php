<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('mods', function (Blueprint $table) {
            $table->string('github_repository_url')->nullable()->after('external_access');
            $table->string('github_repository_path')->nullable()->after('github_repository_url')->default('/docs/');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mods', function (Blueprint $table) {
            $table->dropColumn('github_repository_path');
            $table->dropColumn('github_repository_url');
        });
    }
};
