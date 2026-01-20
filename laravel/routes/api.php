<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WhatsAppController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\ProfileController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::put('/user/profile-information', [ProfileController::class, 'update'])->name('api.user.update');

    // WhatsApp Routes
    Route::get('/whatsapp/qr', [WhatsAppController::class, 'getQrCode'])->name('api.whatsapp.qr');
    Route::post('/whatsapp/send', [WhatsAppController::class, 'sendMessage'])->name('api.whatsapp.send');

    // Admin Routes
    Route::prefix('admin')->middleware('is_admin')->group(function() {
        Route::get('/users', [AdminController::class, 'getUsers'])->name('api.admin.users');
        Route::put('/users/{id}', [AdminController::class, 'updateUser'])->name('api.admin.user.update');
    });
});
