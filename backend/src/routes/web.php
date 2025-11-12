<?php

use App\Http\Controllers\Api;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/home', [Api\NavHomeController::class, 'showHome']);
Route::get('/project', [Api\NavProjectController::class, 'showProject']);
Route::get('/project/{id}', [Api\NavProjectController::class, 'showDetailProject']);
Route::get('/mahasiswa', [Api\NavMahasiswaController::class, 'showMahasiswa']);
Route::get('/mahasiswa/{id}', [Api\NavMahasiswaController::class, 'showDetailMahasiswa']);