<?php

use App\Http\Controllers\Admin\AccessController;
use App\Http\Controllers\Admin\ContactUsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
########################/*Admin Module*/##########################
Route::get('admin/dachboard', [AccessController::class, 'permitted'])->middleware('admin.access');
Route::prefix('admin')->controller(ContactUsController::class)->group(function () {
    Route::get('all_messages', 'allMessages');
    Route::get('reply_message/{id}', 'replyMessage');
});
