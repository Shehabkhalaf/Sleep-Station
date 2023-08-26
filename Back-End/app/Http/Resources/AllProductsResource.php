<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AllProductsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'product_id' => $this->id,
            'product_name' => $this->title,
            'category_id' => $this->category->id,
            'category_name' => $this->category->title,
            'description' => $this->description,
            'color' => json_decode($this->color),
            'discount' => json_decode($this->discount),
            'stock' => $this->stock,
            'price' => json_decode($this->price),
            'size' => json_decode($this->size),
            'arabic_name'=>$this->arabic_product->title,
            'arabic_color'=>json_decode($this->arabic_product->color),
            'arabic-description'=>$this->arabic_product->description,
            'arabic_cat_name'=>$this->arabic_product->arabic_category->title
        ];
    }
}