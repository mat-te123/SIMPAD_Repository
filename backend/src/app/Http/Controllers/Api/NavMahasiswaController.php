<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class NavMahasiswaController extends Controller
{
    public function showMahasiswa(){
        $users = User::select(
            'user_id',
            'fullname',
            'angkatan',
            // 'email',
            // 'linkedin',
            // 'instagram',
            'profile_picture',
        )->get();
        return response()->json($users);
    }

    public function showDetailMahasiswa($id){
        $user = User::select(
            'user_id',
            'fullname',
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
}
