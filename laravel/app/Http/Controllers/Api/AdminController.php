<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    public function getUsers(Request $request)
    {
        if ($request->user()->email !== 'admin@whatubox.com') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return User::all();
    }

    public function updateUser(Request $request, $id)
    {
        if ($request->user()->email !== 'admin@whatubox.com') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user = User::findOrFail($id);
        $user->update($request->all());

        return $user;
    }
}
