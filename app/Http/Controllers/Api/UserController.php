<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::whereIn('role', ['employee', 'manager'])->get(['id', 'name', 'email', 'role']);
        return response()->json($users);
    }

    public function updateRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => 'required|in:hr,manager,employee',
        ]);

        $user->update($validated);

        return response()->json($user);
    }
}
