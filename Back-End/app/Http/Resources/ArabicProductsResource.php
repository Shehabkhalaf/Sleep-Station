<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArabicProductsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'category_name' => $this->title,
            'status' => $this->status,
            'category_id' => $this->id,
            'products' => $this->arabic_products->map(function ($arabic_product) {
                return [
                    'product_id' => $arabic_product->id,
                    'category_id' => $this->id,
                    'product_name' => $arabic_product->title,
                    'description' => $arabic_product->description,
                    'color' => json_decode($arabic_product->color),
                    'discount' => json_decode($arabic_product->product->discount),
                    'stock' => $arabic_product->product->stock,
                    'images' => json_decode($arabic_product->product->image),
                    'price' => json_decode($arabic_product->product->price),
                    'size' => json_decode($arabic_product->product->size),
                ];
            }),
        ];
    }
}
