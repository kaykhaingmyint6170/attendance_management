<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LeaveRequest;
use Illuminate\Http\Request;

class LeaveRequestController extends Controller
{
    public function index(Request $request)
    {
        $query = LeaveRequest::with('user');

        if ($request->user()->role === 'employee') {
            $query->where('user_id', $request->user()->id);
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $records = $query->latest()->paginate(20);

        return response()->json($records);
    }

    public function myRequests(Request $request)
    {
        $records = LeaveRequest::where('user_id', $request->user()->id)
            ->latest()->paginate(20);

        return response()->json($records);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_date',
            'type' => 'required|in:sick,vacation,personal,other',
            'reason' => 'required|string|max:1000',
        ]);

        $validated['user_id'] = $request->user()->id;
        $validated['status'] = 'pending';

        $leave = LeaveRequest::create($validated);

        return response()->json($leave, 201);
    }

    public function update(Request $request, LeaveRequest $leaveRequest)
    {
        if ($leaveRequest->status !== 'pending') {
            return response()->json(['message' => 'Leave request already processed'], 422);
        }

        $validated = $request->validate([
            'status' => 'required|in:approved,rejected',
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        $leaveRequest->update([
            'status' => $validated['status'],
            'admin_notes' => $validated['admin_notes'] ?? null,
            'handled_by' => $request->user()->id,
        ]);

        return response()->json($leaveRequest);
    }

    public function destroy(LeaveRequest $leaveRequest)
    {
        if ($leaveRequest->user_id !== auth()->id() && auth()->user()->role === 'employee') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($leaveRequest->status !== 'pending') {
            return response()->json(['message' => 'Cannot delete processed request'], 422);
        }

        $leaveRequest->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
