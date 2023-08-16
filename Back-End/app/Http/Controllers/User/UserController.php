<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use ApiResponse;
    public function index()
    {
        $user = auth()->user();
        return $this->JsonResponse(200, 'Worked', $user);
    }
    public function allProducts()
    {
        $product = new ProductController;
        return $product->getCategoriesWithProducts();
    }
    public function updateData(Request $request)
    {
        $user = User::find(auth()->user()->id);
        $user->name = $request->name;
        $user->address = $request->address;
        $user->phone = $request->phone;
        $updated = $user->save();
        $data['name'] = $user->name;
        $data['email'] = $user->email;
        $data['phone'] = $user->phone;
        $data['address'] = $user->address;
        if ($updated) {
            return $this->JsonResponse(201, 'Updated', $data);
        } else {
            return $this->JsonResponse(500, 'Error');
        }
    }
    public function showProduct($id)
    {
        $product = new ProductController;
        $prodcut_data = $product->showProductWithCategory($id);
        return $prodcut_data;
    }
    public function contactUs(Request $request)
    {
        $message = Message::create($request->all());
        return $this->JsonResponse(201, 'Message Sent', $message);
    }
}