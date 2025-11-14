<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NavHomeController;
use App\Http\Controllers\Api\NavProjectController;
use App\Http\Controllers\Api\NavMahasiswaController;

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


// Data Routes

Route::controller(NavHomeController::class)->group(function () {
    Route::get('/home', 'showHome');
    Route::get('/company', 'showCompany');
});

Route::controller(NavProjectController::class)->group(function () {
    Route::get('/project', 'showProject');
    Route::get('/project/{id}', 'showDetailProject');
});

Route::controller(NavMahasiswaController::class)->group(function () {
    Route::get('/mahasiswa', 'showMahasiswa');
    Route::get('/mahasiswa/{id}', 'showDetailMahasiswa');
});


// Auth Routes

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/login/google', 'googleLogin'); 
    Route::post('/emailverify','emailVerify');
    Route::post('/verifemail', 'verifEmail');
    Route::post('/forgotpassword', 'forgotPassword');
    Route::post('/resetpassword', 'resetPassword');
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
    Route::get('/user', 'getUser')->middleware('auth:sanctum');
    Route::put('/user/update', 'updateUser')->middleware('auth:sanctum');
});
