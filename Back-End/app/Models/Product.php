<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    public function orderItem(): BelongsTo
    {
        return $this->belongsTo(orderItem::class);
    }
    public function productDetails(): HasMany
    {
        return $this->hasMany(ProductDetail::class);
    }
}
