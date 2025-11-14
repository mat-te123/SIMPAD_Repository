<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;

class NavProjectController extends Controller
{
    public function showProject(){
        $projects = Project::select(
            'project_id',
            'title',
            'cover_image_url',
        )->paginate(6);
        
        if ($projects->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No projects found'
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
                'project_type'
            )
            ->with([
                'users' => function($query) {
                    $query->select(
                        'users.user_id',
                        'users.fullname',
                        'users.profile_picture'
                    );
                },
                'comments.user' => function($query) {
                    $query->select(
                        'users.user_id',
                        'users.fullname',
                        'users.profile_picture'
                    );
                }
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
            ],

            // USERS (tanpa nama "members")
            'users' => $project->users->map(function($u) {
                return [
                    'user_id' => $u->user_id,
                    'fullname' => $u->fullname,
                    'profile_picture' => $u->profile_picture,
                    'role' => $u->pivot->role,
                ];
            }),

            // COMMENTS + user + timestamp
            'comments' => $project->comments->map(function($c) {
                return [
                    'comment_id'   => $c->comment_id,
                    'content'      => $c->content,
                    'created_at'   => $c->created_at->format('Y-m-d H:i:s'),
                    'time_ago'     => $c->created_at->diffForHumans(),
                    'user' => [
                        'user_id'        => $c->user->user_id,
                        'fullname'       => $c->user->fullname,
                        'profile_picture'=> $c->user->profile_picture,
                    ]
                ];
            })
        ]);
    }
    
    
}
