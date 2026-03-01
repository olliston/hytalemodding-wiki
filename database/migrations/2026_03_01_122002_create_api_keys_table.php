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
        Schema::create('api_keys', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');                        // Human-readable label e.g. "Production App"
            $table->string('key', 64)->unique();           // The raw key (store hashed in prod — see note)
            $table->json('scopes')->default('[]');         // e.g. ["read:users","write:orders"]
            $table->unsignedInteger('rate_limit')->default(60); // requests per minute
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });

        Schema::create('api_key_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('api_key_id')->constrained()->cascadeOnDelete();
            $table->string('method', 10);                  // GET, POST, etc.
            $table->string('path');                        // /api/orders
            $table->unsignedSmallInteger('status_code');   // 200, 404, etc.
            $table->string('ip_address', 45)->nullable();
            $table->unsignedInteger('response_ms')->nullable(); // response time
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('api_key_logs');
        Schema::dropIfExists('api_keys');
    }
};
