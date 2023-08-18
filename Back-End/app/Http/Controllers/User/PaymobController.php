<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Paymob;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;


class PaymobController extends Controller
{
    use ApiResponse;
    public function responseCallback(Request $request)
    {
        $string = $request;
        $json = strstr($string, '{');
        $json = json_decode($json);
        $order_id = $json->obj->order->id;
        $trasction_id = $json->obj->id;
        $pending = $json->obj->pending;
        $success = $json->obj->success;
        $paymob = new Paymob;
        $paymob->order_id = $order_id;
        $paymob->transction_id = $trasction_id;
        $paymob->success = $success;
        $paymob->pending = $pending;
        $saved = $paymob->save();
        if ($saved) {
            return redirect('http://127.0.0.1:5501/payment.html?order_id=' . $order_id);
        } else {
            return abort(404);
        }
    }
    public function payDetails(Request $request)
    {
        $order_id = $request->order_id;
        $paymob = Paymob::where('order_id', '=', $order_id)->first();
        if ($paymob->finished == 'false' && $paymob->pending == 'false') {
            $paymob->finished = 'true';
            $paymob->save();
            $data['success'] = $paymob->success;
            $data['amount_cents'] = $paymob->amount_cents;
            return $this->JsonResponse(200, 'Here is the order details', $data);
        } else {
            return $this->JsonResponse(402, 'Order not found');
        }
    }
}
