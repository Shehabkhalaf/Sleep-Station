<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SendMessageRequest;
use App\Models\Message;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    use ApiResponse;
    public function allMessages(Request $request)
    {
        $messages = Message::where('replied', '=', $request->status)->get();
        return $this->JsonResponse(200, 'Messages are here', $messages);
    }
    public function replyMessage($id)
    {
        $message = Message::findorFail($id);
        $message->replied = 'yes';
        $saved = $message->save();
        if ($saved) {
            return $this->JsonResponse(201, 'Message replied');
        } else {
            return $this->JsonResponse('402', 'Message Saveing failed');
        }
    }
}
