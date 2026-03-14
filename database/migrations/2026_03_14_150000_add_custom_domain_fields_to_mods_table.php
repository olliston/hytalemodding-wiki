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
            $table->string('custom_domain')->nullable()->unique()->after('github_repository_path');
            $table->boolean('domain_verified')->default(false)->after('custom_domain');
            $table->string('domain_verification_token')->nullable()->after('domain_verified');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mods', function (Blueprint $table) {
            $table->dropUnique('mods_custom_domain_unique');
            $table->dropColumn([
                'custom_domain',
                'domain_verified',
                'domain_verification_token',
            ]);
        });
    }
};

