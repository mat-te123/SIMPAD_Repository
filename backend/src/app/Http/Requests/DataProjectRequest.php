<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DataProjectRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title' => 'required|string',
            'description' => 'required|string',
            'cover_image_url' => 'required|string',
            'youtube_video_url' => 'required|string',
            'project_year' => 'required|digits:4',
            'project_type' => 'required|in:pad1,pad2,pad12',

            // Assign students
            'students' => 'required|array',
            'students.*.user_id' => 'required|exists:users,user_id',
            'students.*.role' => 'required|in:pm,uiux,fe,be,dev',
        ];
    }
}
