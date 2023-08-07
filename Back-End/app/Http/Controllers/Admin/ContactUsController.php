<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    use ApiResponse;
    public function allMessages()
    {
        $messages = Message::all();
        return $this->JsonResponse(200, 'Messages are here', $messages);
    }
    public function replyMessage($id)
    {
        $deleted = Message::destroy($id);
        if ($deleted) {
            return $this->JsonResponse(200, 'Message deleted');
        } else {
            return $this->JsonResponse(50, 'Message not deleted');
        }
    }
}
