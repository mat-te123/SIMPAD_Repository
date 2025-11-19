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
            'username',
            'angkatan',
            'email',
            'profile_picture',
        )->get();
        return response()->json($users);
    }

    public function showDetailMahasiswa($id){
        // $user = User::select(
        //     'user_id',
        //     'username',
        //     'email',
        //     'profile_info',
        //     'user_role',
        //     'angkatan',
        //     'linkedin',
        //     'instagram',
        //     'phone_number',
        //     'address',
        //     'nim',
        //     'profile_picture',
        //     'background'
        // )
        $user = User::select('*')
        ->with(['projects' => function($query){
            $query->select(
            'projects.project_id',
            'projects.title',
            'projects.description',
            'projects.project_type',
            'projects.cover_image_url'
            );
        }])->where('user_id', $id)->firstOrFail();
        return response()->json($user);
    }
}
