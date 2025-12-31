<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DataProjectRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        if ($this->isMethod('patch') || $this->isMethod('put')) {
            return [
                'title' => 'nullable|string',
                'description' => 'nullable|string',
                'cover_image_url' => 'nullable|image|mimes:jpg,png,jpeg|max:5000',
                'youtube_video_url' => 'nullable|string',
                'project_year' => 'nullable|digits:4',
                'project_type' => 'nullable|in:PAD 1,PAD 2,PAD 1 dan 2',
                'team_name' => 'nullable|string|max:255',

            ];
        }
        return [
            'title' => 'required|string',
            'description' => 'required|string',
            'cover_image_url' => 'required|image|mimes:jpg,png,jpeg|max:5000',
            'youtube_video_url' => 'required|string',
            'project_year' => 'required|digits:4',
            'project_type' => 'required|in:PAD 1,PAD 2,PAD 1 dan 2',

            // Assign students
            'students' => 'required|array',
            'students.*.user_id' => 'required|exists:users,user_id',
            'students.*.role' => 'required|in:Project Manager,UI/UX,Front-end,Back-end',
            'team_name' => 'nullable|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'cover_image_url.required' => 'Please upload a cover image.',
            'cover_image_url.image' => 'The file must be an image.',
            'cover_image_url.mimes' => 'The image must be a jpg, png, or jpeg file.',
            'cover_image_url.max' => 'The image size must not exceed 5MB.',
        ];
    }
}
