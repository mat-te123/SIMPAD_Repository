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
        $user = Auth::user(); // Mengambil user yang sedang login via token

        // Validasi data
        // 'nullable' berarti field tersebut boleh dikosongkan jika user belum mau mengisinya
        $request->validate([
            'username' => 'nullable|string|max:50|unique:users,username,' . $user->user_id . ',user_id',
            'nim' => 'nullable|string|max:20',
            'phone_number' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'profile_info' => 'nullable|string',
            'angkatan' => 'nullable|integer',
            'linkedin' => 'nullable|url',
            'instagram' => 'nullable|string',
            'background' => 'nullable|string',
            // Validasi upload gambar
            'profile_picture' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
        ]);

        // Handle Upload Foto Profil
        if ($request->hasFile('profile_picture')) {
            // Hapus foto lama jika ada (opsional, untuk menghemat storage)
            if ($user->profile_picture) {
                Storage::disk('public')->delete($user->profile_picture);
            }

            // Simpan foto baru
            $path = $request->file('profile_picture')->store('profile_pictures', 'public');
            $user->profile_picture = $path;
        }

        // Update data-data teks
        // Kita gunakan $request->input(key, default) untuk keamanan
        if ($request->has('username')) $user->username = $request->username;
        if ($request->has('nim')) $user->nim = $request->nim;
        if ($request->has('phone_number')) $user->phone_number = $request->phone_number;
        if ($request->has('address')) $user->address = $request->address;
        if ($request->has('profile_info')) $user->profile_info = $request->profile_info;
        if ($request->has('fullname')) $user->fullname = $request->fullname;
        if ($request->has('angkatan')) $user->angkatan = $request->angkatan;
        if ($request->has('linkedin')) $user->linkedin = $request->linkedin;
        if ($request->has('instagram')) $user->instagram = $request->instagram;
        if ($request->has('background')) $user->background = $request->background;

        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully',
            'data' => $user
        ]);
    }
}