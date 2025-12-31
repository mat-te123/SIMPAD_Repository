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
    public function ShowComments($project_id)
    {
        $comments = Comment::where('project_id', $project_id)
            ->with('user:user_id,username,profile_picture') // Memuat relasi user dengan kolom yang dibutuhkan
            ->get();

        return response()->json($comments);
    }
    public function destroy($comment_id)
    {
        $comment = Comment::findOrFail($comment_id);

        // Pastikan hanya pemilik komentar yang dapat menghapusnya
        if ($comment->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }
}