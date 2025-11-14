<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Str;


class AuthController extends Controller
{
    
    public function googleLogin(Request $request){
        $email = $request->email;
        
        if (!$email || (!Str::endsWith($email, '@mail.ugm.ac.id') && !Str::endsWith($email, '@ugm.ac.id'))) {
            return response()->json([
                'status' => 'error',
                'message' => 'Login is only available for @mail.ugm.ac.id email addresses.'
            ], 422);
        }

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'username' => explode('@', $email)[0],
            ]
        );

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login Success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer'
            ]
        ]);
    }
}
