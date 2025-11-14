<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        /** @var \App\Models\User $user */
        
        $user = Auth::user(); // user yang sedang login

        // Validasi data
        $request->validate([
            'username' => 'required|string|max:50|unique:users,username,' . $user->id,
            'nim' => 'required|string|max:20',
            'phone_number' => 'required|string|max:20',
            'address' => 'required|string',
            'profile_picture' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
            'profile_info' => 'nullable|string',
            'fullname' => 'required|string|max:100',
            'angkatan' => 'required|integer',
            'linkedin' => 'nullable|url',
            'instagram' => 'nullable|string',
            'background' => 'nullable|string',
        ]);

        // ❗ EMAIL Tidak boleh diubah
        // Jadi TIDAK ada `$user->email = ...`

        // Upload foto profil kalau ada
        if ($request->hasFile('profile_picture')) {
            if ($user->profile_picture) {
                Storage::delete($user->profile_picture);
            }

            $path = $request->file('profile_picture')->store('profile_pictures');
            $user->profile_picture = $path;
        }

        // Username BOLEH diubah
        $user->username = $request->username;

        // Update data lain
        $user->nim = $request->nim;
        $user->phone_number = $request->phone_number;
        $user->address = $request->address;
        $user->profile_info = $request->profile_info;
        $user->fullname = $request->fullname;
        $user->angkatan = $request->angkatan;
        $user->linkedin = $request->linkedin;
        $user->instagram = $request->instagram;
        $user->background = $request->background;

        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully',
            'data' => $user
        ]);
    }
}
