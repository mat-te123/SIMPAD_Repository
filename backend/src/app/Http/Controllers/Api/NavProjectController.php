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
        return response()->json($projects);
    }
    public function showDetailProject($id){
        $project = Project::where('project_id', $id)->first();
        return response()->json($project);
    }
    
}
