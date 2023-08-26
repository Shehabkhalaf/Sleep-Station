<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\ArabicCategoruResource;
use App\Http\Resources\CategoriesResource;
use App\Models\ArabicCategory;
use App\Models\Category;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    use ApiResponse;
    public function addCategory(CategoryRequest $categoryRequest)
    {
        /*Add English Category*/
        $EnglishcCategory = new Category;
        $EnglishcCategory->title = $categoryRequest->title;
        $EnglishAdded = $EnglishcCategory->save();
        /*Add Arabic Category*/
        $ArabicCategory = new ArabicCategory;
        $ArabicCategory->category_id = $EnglishcCategory->id;
        $ArabicCategory->title = $categoryRequest->arabic_title;
        $ArabicAdded = $ArabicCategory->save();
        /*Response*/
        if ($ArabicAdded && $EnglishAdded) {
            return $this->JsonResponse(201, 'Category Added', [$ArabicCategory, $EnglishcCategory]);
        } else {
            return $this->JsonResponse(500, 'Addition failed');
        }
    }
    public function allCategories(Request $request)
    {
        /*Arabic Lang*/
        if ($request->lang == 'ar') {
            $categories = ArabicCategory::with('arabic_products')->get();
            return $this->JsonResponse(200, 'التصنيفات العربيه', ArabicCategoruResource::collection($categories));
        }
        /*English Lang*/
        $categories = Category::with('products')->get();
        return $this->JsonResponse(200, 'Here are the categories', CategoriesResource::collection($categories));
    }
    public function deleteCategory(Request $request)
    {
        $deleted = Category::destroy($request->id);
        if ($deleted) {
            return $this->JsonResponse(200, 'Category has been deleted');
        } else {
            return $this->JsonResponse(500, 'Error has been occured');
        }
    }
}
