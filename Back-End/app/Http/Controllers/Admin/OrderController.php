<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminOrders;
use App\Models\AdminOrder;
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
    public function deliverOrder(Request $request)
    {
        $order = AdminOrder::find($request->id);
        $order->paid = 'paid';
        $delivered = $order->save();
        return $delivered ? $this->JsonResponse(200, 'Order Delivered', $order) : $this->JsonResponse(500, 'Nothing happened');
    }
    public function paidOrders()
    {
        $orders = AdminOrders::collection(AdminOrder::where('paid', 'paid')->get());
        return $this->JsonResponse(200, 'Delivered Orders', $orders);
    }
}
