<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\NationalityController;
use App\Http\Controllers\TestController;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('patients/upload', [PatientController::class, 'uploadPhoto']);
    Route::apiResource('patients', PatientController::class);
    Route::apiResource('languages', LanguageController::class);
    Route::apiResource('nationalities', NationalityController::class);
});

// Remove auth middleware for testing
Route::post('patients/upload', [PatientController::class, 'uploadPhoto']);
Route::apiResource('patients', PatientController::class);
Route::apiResource('languages', LanguageController::class);
Route::apiResource('nationalities', NationalityController::class);
Route::apiResource('tests', TestController::class);


