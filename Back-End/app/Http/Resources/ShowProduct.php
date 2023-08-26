<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ShowProduct extends JsonResource
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
            'category_id' => $this->category->id,
            'product_name' => $this->title,
            'category_name' => $this->category->title,
            'description' => $this->description,
            'color' => json_decode($this->color, true),
            'discount' => json_decode($this->discount),
            'stock' => $this->stock,
            'image' => json_decode($this->image),
            'size' =>  json_decode($this->size, true),
            'price' =>  json_decode($this->price, true),
            'arabic_name' => $this->arabic_product->title,
            'arabic_color' => json_decode($this->arabic_product->color),
            'arabic-description' => $this->arabic_product->description,
            'arabic_name_category'=>$this->arabic_product->arabic_category->title
        ];
    }
}