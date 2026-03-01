<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApiKeyLog extends Model
{
    protected $fillable = [
        'api_key_id',
        'method',
        'path',
        'status_code',
        'ip_address',
        'response_ms',
    ];

    public function apiKey(): BelongsTo
    {
        return $this->belongsTo(ApiKey::class);
    }
}
