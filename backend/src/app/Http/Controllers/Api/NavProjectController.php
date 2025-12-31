<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class NavProjectController extends Controller
{
    public function showProject(Request $request)
    {

        $perPage = $request->input('per_page', 6);
        $ProjectType = $request->input('project_type');
        $CorrectTypes = [$ProjectType, 'PAD 1 dan 2'];
        $Sort = $request->input('sort');

        $query = Project::select(
            'project_id',
            'title',
            'cover_image_url',
            'project_type',
        )->with([
            'users' => function ($query) {
                $query->select(
                    'users.user_id',
                    'users.username',
                );
            },
        ]);

        if ($CorrectTypes) {
            $query->whereIn('project_type', $CorrectTypes);
        }
        if ($Sort) {
            if ($Sort === 'New') {
                $query->orderBy('created_at', 'desc');
            } elseif ($Sort === 'A-Z') {
                $query->orderBy('title', 'asc');
            } elseif ($Sort === 'Z-A') {
                $query->orderBy('title', 'desc');
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }
        $projects = $query->paginate($perPage);

        if ($projects->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No projects found',
            ], 404);
        }

        return response()->json($projects);
    }

    public function showDetailProject($id)
    {
        $project = Project::select(
            'project_id',
            'title',
            'description',
            'cover_image_url',
            'youtube_video_url',
            'project_year',
            'project_type', 
            'team_name',
        )
            ->with([
            'users' => function ($query) {
                $query->select(
                    'users.user_id',
                    'users.username',
                    'users.profile_picture'
                );
            },
            'comments.user' => function ($query) {
                $query->select(
                    'users.user_id',
                    'users.username',
                    'users.profile_picture'
                );
            },
        ])
            ->findOrFail($id);

        return response()->json([
            'project' => [
                'project_id' => $project->project_id,
                'title' => $project->title,
                'description' => $project->description,
                'cover_image_url' => $project->cover_image_url,
                'youtube_video_url' => $project->youtube_video_url,
                'project_year' => $project->project_year,
                'project_type' => $project->project_type,
                'team_name' => $project->team_name,
            ],

            // USERS (tanpa nama "members")
            'users' => $project->users->map(function ($u) {
                return [
                    'user_id' => $u->user_id,
                    'username' => $u->username,
                    'profile_picture' => $u->profile_picture,
                    'role' => $u->pivot->role,
                ];
            }),

            // COMMENTS + user + timestamp
            'comments' => $project->comments->map(function ($c) {
                return [
                    'comment_id' => $c->comment_id,
                    'content' => $c->content,
                    'created_at' => $c->created_at->format('Y-m-d H:i:s'),
                    'time_ago' => $c->created_at->diffForHumans(),
                    'user' => [
                        'user_id' => $c->user->user_id,
                        'username' => $c->user->username,
                        'profile_picture' => $c->user->profile_picture,
                    ],
                ];
            }),
        ]);
    }

    // Controller for android app to get all projects without pagination
    public function getAllProjects(Request $request)
    {

        $projectsType = $request->input('project_type');
        $CorrectTypes = [$projectsType, 'PAD 1 dan 2'];
        $totalproject = Project::count();

        $query = Project::select(
            'project_id',
            'title',
            'cover_image_url',
            'project_type',
            
        )->with([
            'users' => function ($query) {
                $query->select(
                    'users.user_id',
                    'users.username',
                );
            },
        ]);

        if ($CorrectTypes) {
            $query->whereIn('project_type', $CorrectTypes);
        }

        $projects = $query->orderBy('created_at', 'desc')->get();
        return response()->json($projects);
    }

    
}
