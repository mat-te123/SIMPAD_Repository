<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function store(DataProjectRequest $request)
    {
        // 1. Create project
        $project = Project::create([
            'title' => $request->title,
            'description' => $request->description,
            'cover_image_url' => $request->cover_image_url,
            'youtube_video_url' => $request->youtube_video_url,
            'project_year' => $request->project_year,
            'project_type' => $request->project_type,
        ]);

        // 2. Assign users with roles
        foreach ($request->students as $student) {
            $project->users()->attach($student['user_id'], [
                'role' => $student['role']
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Project created successfully',
            'data' => $project->load('users')
        ], 201);
    }
}
