<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccessController extends Controller
{
    use ApiResponse;
    public function login(Request $request)
    {
        $admin = Admin::where('email', '=', $request->email)->first();
        if ($admin) {
            if (Hash::check($request->password, $admin->password)) {
                $data['token'] = $admin->token;
                return $this->JsonResponse(200, 'You are logged in', $data);
            } else {
                return $this->JsonResponse(401, 'You are not permitted');
            }
        } else {
            return $this->JsonResponse(401, 'You are not permitted');
        }
    }
    public function token()
    {
        $admin = Admin::findorFail(1);
        $admin->token = 'R7t#xP1$9@fGzQwY2&5U8*oK$L3aXcZ6';
        $admin->save();
        return 'done';
    }
}
