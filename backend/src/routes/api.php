<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/emailverify','emailVerify');
    Route::post('/verifemail', 'verifEmail');
    Route::post('/forgotpassword', 'forgotPassword');
    Route::post('/resetpassword', 'resetPassword');
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
    Route::get('/user', 'getUser')->middleware('auth:sanctum');
    Route::put('/user/update', 'updateUser')->middleware('auth:sanctum');
});
