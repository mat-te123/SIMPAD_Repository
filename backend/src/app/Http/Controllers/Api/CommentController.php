<?php

namespace App\Http\Controllers\Api;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentController extends Controller
{
    public function store(Request $request, $project_id)
    {
        $request->validate([
            'content' => 'required|string'
        ]);

        $comment = Comment::create([
            'project_id' => $project_id,
            'user_id' => auth()->id(), // otomatis user terlogin
            'content' => $request->input('content')
        ]);

        return response()->json([
            'message' => 'Comment added successfully',
            'comment' => $comment
        ], 201);
    }
}
