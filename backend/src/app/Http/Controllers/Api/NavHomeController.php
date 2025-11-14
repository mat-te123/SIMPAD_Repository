<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use App\Models\Project;

class NavHomeController extends Controller
{
    public function showCompany(){
        $companies = Company::select(
            'company_id',
            'company_name',
            'company_image',
        )->get();

        if ($companies->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No companies found'
            ], 404);
        }

        
        return response()->json($companies);
    }
    public function showProject(){
        $projects = Project::select(
            'project_id',
            'title',
            'cover_image_url',
        )->paginate(6);
        return response()->json($projects);
    }
    public function showHome(){
        $companies =$this->showCompany();
        $projects = $this->showProject();
        return response()->json([
            'status' => 'success',
            'data' => [
                'companies' => $companies,
                'projects' => $projects,
            ]
        ]);
    }
}
