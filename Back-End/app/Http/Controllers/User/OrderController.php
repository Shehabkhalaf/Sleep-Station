<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserOrders;
use App\Models\AdminOrder;
use App\Models\Product;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    use ApiResponse;
    public function allOrders()
    {
        $user = User::find(auth()->user()->id);
        $orders = UserOrders::collection($user->orders);
        return $this->JsonResponse(200, 'User orders', $orders);
    }
    public function makeOrder(Request $request)
    {
        $user_data = 'name:' . $request->name . '<br>' . 'email:' . $request->email . '<br>' . 'phone:' . $request->phone . '<br>' . 'location:' . $request->address;
        $adminOrder = new AdminOrder;
        $adminOrder->user_data = $user_data;
        $adminOrder->order_details = $request->order_details;
        $adminOrder->total_price = $request->total_price;
        $adminOrder->promocode = $request->has('promocode') ? $request->promocode : 'nothing';
        $adminOrder->paid = $request->paid_method;
        $adminOrder->payment_details = $request->has('order_id') ? $request->order_id : 'nothing';
        $adminOrders = $adminOrder->save();
        $products = $request->products;
        foreach ($products as $product) {
            $product_id = $product['product_id'];
            $product_data = Product::find($product_id);
            $product_data->stock = ($product_data->stock) - ($product['amount']);
            $product_data->save();
        }
        if ($adminOrders) {
            return $this->JsonResponse(200, 'Order Done', $adminOrders);
        } else {
            return $this->JsonResponse(500, 'Somethin went wrong');
        }
    }
}