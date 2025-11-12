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
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['register', 'login', 'emailVerify', 'verifEmail', 'logout']);
    }

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|between:2,100',
            'last_name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users|ends_with:@mail.ugm.ac.id',
            'password' => 'required|string|min:6',
        ], [
            // This is an optional custom error message
            'email.ends_with' => 'Registration is only available for @mail.ugm.ac.id email addresses.'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        // ... the rest of your registration logic remains the same
        $baseUsername = strtolower($request->first_name . $request->last_name);
        $username = $baseUsername;
        $counter = 1;

        while (User::where('username', $username)->exists()) {
            $username = $baseUsername . $counter;
            $counter++;
        }

        $user = User::create([
            'username' => $username,
            'email' => $request->email,
            'password_hash' => Hash::make($request->password)
        ]);

        $token = $user ->createToken('authToken')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'User Successfully Registered',
            'user' => $user,
            'authorisation'=>[
                'token' => $token,
                'type' => 'bearer'
            ]
        ], 201);
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        
        $credentials = $request->only('username', 'password');

        $token = Auth::attempt($credentials);
        if (! $token ) {
            return response()->json([
                'status' => 'error', 
                'message' => 'Username or Password False'], 401);
        }

        $user = Auth::User();
        return response()->json([
            'status'=>'success',
            'message'=> 'Login Success',
            'user'=> $user,
            'authorisation'=> [
                'token'=> $token,
                'type'=> 'bearer'
            ]
        ]);
    }

    public function emailVerify($email){
        $user = User::where('email', $email)->first();  
        if ($user){
            $user->emailverification();
            return response()->json([
                'status'=>'success',
                'message'=> 'Email is registered, Verify Your Email Address'
            ]);
        } else {
            return response()->json([
                'status'=>'error',
                'message'=> 'Email not found'
            ], 404);
        }
    }

    public function verifEmail(Request $request){
        $token = $request->input('token');
        $user = User::where('email_verification_token', $token)->first();
        if ($user) {
            if ($user->email_verified_at === null) {
                $user->update([
                    'email_verified_at' => now(),
                    'email_verification_token' => null,
                    'email_verified' => 1,
                ]);
                return response()->json([
                    'status' => 'success', 
                    'message' => 'Email Verified Succesfully'
                ]);
            } else {
                return response()->json([
                    'status' => 'error', 
                    'message' => 'Email Already Verified'
                ]);
            }
        } else {
            return response()->json([
                    'status' => 'error', 
                    'message' => 'Invalid Token'
                ]);
        }
    }

    public function forgotPassword(Request $request){ 
        $email = $request->email;
        $user = User::where('email', $email)->first();  
        if ($user){
            $password = Str::random(10);
            Mail::send([],[],function($message) use ($email, $password){
                $message->to($email)
                        ->subject('Password Reset')
                        ->setBody('Your new password is: ' . $password);
            });
            User::where('email', $email)->update([
                'password_hash' => Hash::make($password)
            ]);
            return response()->json([
                'status'=>'success',
                'message'=> 'New Password has been sent to your email'
            ]);
        } else{
            return response()->json([
                'status'=>'error',
                'message'=> 'Email not found'
            ], 404);
        }
    }

    public function resetPassword(Request $request){
        $user_id = $request->user_id;
        $current_password = $request->cpassword;
        $new_password = $request->npassword;
        $user = User::find($user_id);  
        if ($user){
            if (Hash::check($current_password, $user->password)) {
                User::where('user_id', $user_id)->update([
                    'password_hash' => Hash::make($new_password)
                ]);
                return response()->json([
                    'status'=>'success',
                    'message'=> 'Password changed successfully'
                ]);
            } else {
                return response()->json([
                    'status'=>'error',
                    'message'=> 'Current password is incorrect'
                ], 400);
            }
        } else{
            return response()->json([
                'status'=>'error',
                'message'=> 'User not found'
            ], 404);
        }
    }

    public function logout(Request $request){
        $request->user()->token()->delete();
        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
