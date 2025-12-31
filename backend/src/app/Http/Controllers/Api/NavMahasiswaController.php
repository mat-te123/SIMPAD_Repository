<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class NavMahasiswaController extends Controller
{
    public function showMahasiswa(Request $request){
        $FilterAngkatan = $request->input("angkatan");
        $Sort = $request->input("sort");
        $query = User::select(
            'user_id',
            'username',
            'angkatan',
            'nim',
            // 'linkedin',
            // 'instagram',
            'profile_picture',
        )->where('user_role', '!=', 'admin');

        if ($FilterAngkatan && $FilterAngkatan !== "All"){
            $query->where('angkatan', $FilterAngkatan);
        }
        
        

        if ($Sort){
            if ($Sort === 'New'){
                $query->orderBy('created_at', 'desc');
            } elseif ($Sort === 'A-Z'){
                $query->orderBy('username', 'asc');
            } elseif ($Sort === 'Z-A'){
                $query->orderBy('username', 'desc');
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $users = $query->get();
        
        return response()->json($users);
    }

    public function showDetailMahasiswa($id){
        $user = User::select(
            'user_id',
            'username',
            'angkatan',
            'email',
            'linkedin',
            'instagram',
            'profile_picture',
            'phone_number',
            'address',
            'nim',
            'background',
        )
        ->where('user_id', $id)
        ->with(['projects' => function($query){
            $query->select(
            'projects.project_id',
            'projects.title',
            'projects.description',
            'projects.project_type',
            'projects.cover_image_url'
            );
        }])->findOrFail($id);
        
        return response()->json($user);
    }

    public function getUserNotHaveProject(Request $request){
    $projectType = $request->input('project_type');
    $Valid = [$projectType, 'PAD 1 dan 2'];

    $users = User::where('user_role', '!=', 'admin')->
    whereDoesntHave('projects', function ($query) use ($Valid) {
        $query->whereIn('project_type', $Valid);
    })->get(['user_id', 'username', 'email', 'nim', 'profile_picture',]); // <--- Added nim and picture

    return response()->json($users);
}
}