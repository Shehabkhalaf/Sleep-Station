<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class AccessController extends Controller
{
    use ApiResponse;
    public function login(Request $request)
    {
        if ($request->username == 'admin@sleepstation.com' && $request->passwrod == 'pH3vyPOzTY5thUHQnlLucUf6zAGyqG') {
            return $this->JsonResponse(200, 'You are logged in');
        } else {
            return $this->JsonResponse(401, 'You are not permitted');
        }
    }
}
