<?php

use App\Models\Page;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->string('kind')->default(Page::KIND_PAGE)->after('slug');
            $table->index(['mod_id', 'kind']);
        });

        DB::table('pages')->update(['kind' => Page::KIND_PAGE]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->dropIndex('pages_mod_id_kind_index');
            $table->dropColumn('kind');
        });
    }
};

