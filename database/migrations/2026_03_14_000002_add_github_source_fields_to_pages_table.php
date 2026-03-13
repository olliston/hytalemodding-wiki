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
        Schema::table('pages', function (Blueprint $table) {
            $table->string('source_type')->nullable()->after('slug');
            $table->string('source_path')->nullable()->after('source_type');
            $table->string('source_sha')->nullable()->after('source_path');

            $table->index(['mod_id', 'source_type', 'source_path'], 'pages_mod_source_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->dropIndex('pages_mod_source_index');
            $table->dropColumn(['source_sha', 'source_path', 'source_type']);
        });
    }
};

