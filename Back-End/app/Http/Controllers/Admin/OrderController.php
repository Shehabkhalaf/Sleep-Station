<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminOrders;
use App\Models\AdminOrder;
use App\Models\ArabicProduct;
use App\Models\Order;
use App\Models\Product;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    use ApiResponse;
    public function cashOrders()
    {
        $orders = AdminOrders::collection(AdminOrder::where('paid', 'cash')->get());
        return $this->JsonResponse(200, '', $orders);
    }
    public function acceptOrder(Request $request)
    {
        $order = AdminOrder::find($request->id);
        $order->paid = 'paid';
        $delivered = $order->save();
        return $delivered ? $this->JsonResponse(200, 'Order Accepted', $order) : $this->JsonResponse(500, 'Nothing happened');
    }
    public function rejectOrder(Request $request)
    {
        $order = AdminOrder::find($request->id);
        $order_details = json_decode($order->order_details);
        foreach ($order_details as $order_detail) {
            $pattern = '/^[\p{Arabic}\s]+$/u';
            $arr_of_order_detail = explode(',', $order_detail);
            $amount = $arr_of_order_detail[count($arr_of_order_detail) - 1];
            if (preg_match($pattern, $arr_of_order_detail[0])) {
                $arabic_product = ArabicProduct::where('title', $arr_of_order_detail[0])->first();
                $product = Product::find($arabic_product->product_id);
                $product->stock = $product->stock + $amount;
                $product->save();
            } else {
                $product = Product::where('title', $arr_of_order_detail[0])->first();
                $product->stock = $product->stock + $amount;
                $product->save();
            }
        }
        $destroyAdmin = AdminOrder::destroy($request->id);
        $destroyUser = Order::destroy($request->id);
        if ($destroyUser && $destroyAdmin) {
            return $this->JsonResponse(200, 'Rejected');
        } else {
            return $this->JsonResponse(500, 'Error has been occured');
        }
    }
    public function paidOrders()
    {
        $orders = AdminOrders::collection(AdminOrder::where('paid', 'paid')->get());
        return $this->JsonResponse(200, 'Delivered Orders', $orders);
    }
}