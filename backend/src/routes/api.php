<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NavHomeController;
use App\Http\Controllers\Api\NavProjectController;
use App\Http\Controllers\Api\NavMahasiswaController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\AdminController;

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
    Route::get('/projects', 'showProject');
    Route::get('/project/{id}', 'showDetailProject');
});

// Mahasiswa (Public Read)
Route::controller(NavMahasiswaController::class)->group(function () {
    Route::get('/mahasiswa', 'showMahasiswa');
    Route::get('/mahasiswa/{id}', 'showDetailMahasiswa');
    Route::get('/users/available', [NavMahasiswaController::class, 'getUserNotHaveProject']);
});

// Ambil data komentar untuk sebuah project
Route::get('/project/{project_id}/comments', [\App\Http\Controllers\Api\CommentController::class, 'ShowComments']);

// Api android 
Route::controller(NavProjectController::class)->group(function () {
    Route::get('/android/allprojects', 'getAllProjects');
    Route::get('/android/project/{id}', 'showDetailProject');
});

Route::get('/android/mahasiswa/{id}', [NavMahasiswaController::class, 'showDetailMahasiswa'])->name('user');
Route::post('/android/login-google', [AuthController::class, 'googleLogin']);


// --- PROTECTED ROUTES (Butuh Login / Bearer Token) ---

Route::middleware('auth:sanctum')->group(function () {

    // Auth (Logout & Get User)
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Profile (Update Diri Sendiri)
    Route::post('/profile/update', [ProfileController::class, 'update']);
    Route::post('/android/profile/update', [ProfileController::class, 'update']);


    // Projects (Create & Comment)
    Route::post('/addproject', [ProjectController::class, 'store']);
    Route::post('/project/{project_id}/comments', [\App\Http\Controllers\Api\CommentController::class, 'store']);
    Route::put('/editproject/{project_id}', [ProjectController::class, 'editDataProject']);
    Route::delete('/deleteproject/{project_id}', [ProjectController::class, 'DeleteProject']);

    // Comments (Delete Comment)
    Route::delete('/comments/{comment_id}', [\App\Http\Controllers\Api\CommentController::class, 'destroy']);
    
    // User Management (Admin Only)
    Route::middleware('isAdmin')->group(function () {
        Route::get('/admin/users', [AdminController::class, 'getAllUsers']);
        Route::get('/admin/projects', [AdminController::class, 'getAllProjects']);
        Route::get('/admin/companies', [AdminController::class, 'getAllCompanies']);
        Route::get('/admin/comments', [AdminController::class, 'getAllComments']);
        Route::post('/admin/addcompany', [AdminController::class, 'AddCompany']);
        Route::delete('/admin/deleteuser/{id}', [AdminController::class, 'deleteUser']);
        Route::delete('/admin/deleteproject/{id}', [AdminController::class, 'deleteProject']);
        Route::delete('/admin/deletecompany/{id}', [AdminController::class, 'deleteCompany']);
        Route::delete('/admin/deletecomment/{id}', [AdminController::class, 'deleteComment']);
    });
    
});