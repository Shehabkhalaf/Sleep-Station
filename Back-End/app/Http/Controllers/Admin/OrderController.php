<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminOrders;
use App\Models\AdminOrder;
use App\Models\Order;
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
        return $delivered ? $this->JsonResponse(200, 'Order Delivered', $order) : $this->JsonResponse(500, 'Nothing happened');
    }
    public function rejectOrder(Request $request)
    {
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
