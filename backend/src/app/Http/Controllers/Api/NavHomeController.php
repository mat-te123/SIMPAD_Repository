<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use App\Models\Project;

class NavHomeController extends Controller
{
    public function showCompany(){
        $companies = $this->getCompanies();

        if ($companies->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No companies found'
            ], 404);
        }

        
        return response()->json($companies);
    }
    public function showProject(){
        $projects = $this->getProjects();
        return response()->json($projects);
    }
    public function showHome(){
        $companies =$this->getCompanies();
        $projects = $this->getProjects();
        return response()->json([
            'status' => 'success',
            'data' => [
                'companies' => $companies,
                'projects' => $projects,
            ]
        ]);
    }
    protected function getCompanies()
    {
        return Company::select(
            'company_id',
            'company_name',
            'company_image',
        )->get();
    }
    protected function getProjects()
    {
        return Project::select(
            'project_id',
            'title',
            'cover_image_url',
        )->paginate(6);
    }
}