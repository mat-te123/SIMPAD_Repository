<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NavHomeController;
use App\Http\Controllers\Api\NavProjectController;
use App\Http\Controllers\Api\NavMahasiswaController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\UserManagementController;

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

// --- PUBLIC ROUTES (Tidak butuh login) ---

// Auth (Login)
Route::post('/login/google', [AuthController::class, 'googleLogin']);

// Dropdown Data
Route::get('/students', function() {
    return \App\Models\User::select('user_id', 'fullname')->get();
});

// Home & Navigation
Route::controller(NavHomeController::class)->group(function () {
    Route::get('/home', 'showHome');
    Route::get('/company', 'showCompany');
});

// Projects (Public Read)
Route::controller(NavProjectController::class)->group(function () {
    Route::get('/project', 'showProject');
    Route::get('/project/{id}', 'showDetailProject');
});

// Mahasiswa (Public Read)
Route::controller(NavMahasiswaController::class)->group(function () {
    Route::get('/mahasiswa', 'showMahasiswa');
    Route::get('/mahasiswa/{id}', 'showDetailMahasiswa');
});


// --- PROTECTED ROUTES (Butuh Login / Bearer Token) ---

Route::middleware('auth:sanctum')->group(function () {

    // Auth (Logout & Get User)
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Profile (Update Diri Sendiri)
    Route::post('/profile/update', [ProfileController::class, 'update']);

    // Projects (Create & Comment)
    Route::post('/addproject', [ProjectController::class, 'store']);
    Route::post('/project/{project_id}/comments', [\App\Http\Controllers\Api\CommentController::class, 'store']);
});