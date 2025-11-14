<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NavHomeController;
use App\Http\Controllers\Api\NavProjectController;
use App\Http\Controllers\Api\NavMahasiswaController;
use App\Http\Controllers\Api\ProjectController;


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

Route::controller(ProjectController::class)->group(function () {
    Route::post('/addproject', 'store')->middleware('auth:sanctum');
});

// Untuk dimasukin ke dropdown mahasiswa 
Route::get('/students', function() {
    return \App\Models\User::select('user_id', 'fullname')->get();
});


Route::controller(NavHomeController::class)->group(function () {
    Route::get('/home', 'showHome');
    Route::get('/company', 'showCompany');
});

Route::controller(NavProjectController::class)->group(function () {
    Route::get('/project', 'showProject');
    Route::get('/project/{id}', 'showDetailProject');
    Route::post('/project/{project_id}/comments', [\App\Http\Controllers\Api\CommentController::class, 'store'])->middleware('auth:sanctum');
});

Route::controller(NavMahasiswaController::class)->group(function () {
    Route::get('/mahasiswa', 'showMahasiswa');
    Route::get('/mahasiswa/{id}', 'showDetailMahasiswa');
});


// Auth Routes

Route::controller(AuthController::class)->group(function () {
    Route::post('/login/google', 'googleLogin'); 
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
});
