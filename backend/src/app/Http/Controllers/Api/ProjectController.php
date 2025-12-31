<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataProjectRequest;
use App\Models\Project;
use App\Model\User;

class ProjectController extends Controller
{
    public function store(DataProjectRequest $request)
    {


        $user = auth()->user();
        $students = $request->students;
        $projectType = $request->project_type;
        $coverImagePath = null;
        $teamname = $request->team_name;

        $HasProject = $user->projects()->where('project_type', $projectType)->exists();


        if ($HasProject) {
            return response()->json([
                'status' => 'error',
                'message' => 'User already has a project assigned.'
            ], 400);
        }


        if ($request->hasFile('cover_image_url')) {
            $coverImagePath = $request->file('cover_image_url')->store('cover_images', 'public');
        }
        

        // 1. Create project
        $project = Project::create([
            'title' => $request->title,
            'description' => $request->description,
            'youtube_video_url' => $request->youtube_video_url,
            'project_year' => $request->project_year,
            'project_type' => $projectType,
            'cover_image_url' => $coverImagePath,
            'team_name' => $teamname,
        ]) ;

        

        // 2. Assign users with roles
        foreach ($students as $student) {
            $project->users()->attach($student['user_id'], [
                'role' => $student['role'],
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Project created successfully',
            'data' => $project->load('users'),
        ], 201);
    }

    public function editDataProject(DataProjectRequest $request, $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'status' => 'error',
                'message' => 'Project not found.'
            ], 404);
        }

        $project->update($request->only([
            'title',
            'description',
            'youtube_video_url',
            'team_name',
        ]));

        if ($request->hasFile('cover_image_url')) {
            $coverImagePath = $request->file('cover_image_url')->store('cover_images', 'public');
            $project->cover_image_url = $coverImagePath;
            $project->save();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Project updated successfully',
            'data' => $project->load('users'),
        ], 200);
    }

    public function DeleteProject($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'status' => 'error',
                'message' => 'Project not found.'
            ], 404);
        }

        $project->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Project deleted successfully.'
        ], 200);
    }
}
