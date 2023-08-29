<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowArabicProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'product_id' => $this->product->id,
//            'arabic_product_id' => $this->id,
            'category_id' => $this->arabic_category->id,
            'product_name' => $this->title,
            'category_name' => $this->arabic_category->title,
            'description' => $this->description,
            'color' => json_decode($this->color),
            'discount' => json_decode($this->product->discount),
            'price'=>json_decode($this->product->price),
            'stock' => $this->product->stock,
            'image' => json_decode($this->product->image),
            'size' =>  json_decode($this->product->size),
        ];
    }
}