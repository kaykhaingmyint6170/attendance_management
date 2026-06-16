<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AttendanceRecord;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function index(Request $request)
    {
        $query = AttendanceRecord::with('user');

        // Employees see only their own records
        if ($request->user()->role === 'employee') {
            $query->where('user_id', $request->user()->id);
        }

        // Filter by date range
        if ($request->date_from) {
            $query->where('date', '>=', $request->date_from);
        }
        if ($request->date_to) {
            $query->where('date', '<=', $request->date_to);
        }
        if ($request->user_id && $request->user()->role !== 'employee') {
            $query->where('user_id', $request->user_id);
        }

        $records = $query->latest('date')->paginate(20);

        return response()->json($records);
    }

    public function myRecords(Request $request)
    {
        $records = AttendanceRecord::where('user_id', $request->user()->id)
            ->latest('date')->paginate(20);

        return response()->json($records);
    }

    public function checkIn(Request $request)
    {
        $user = $request->user();
        $today = now()->format('Y-m-d');

        // Check if already checked in
        $existing = AttendanceRecord::where('user_id', $user->id)
            ->where('date', $today)->first();

        if ($existing && $existing->check_in_at) {
            return response()->json(['message' => 'Already checked in today'], 422);
        }

        $now = now();
        $status = 'present';

        // Consider late if after 9:00 AM
        if ($now->format('H:i') > '09:00') {
            $status = 'late';
        }

        $record = AttendanceRecord::updateOrCreate(
            ['user_id' => $user->id, 'date' => $today],
            ['check_in_at' => $now, 'status' => $status]
        );

        return response()->json($record);
    }

    public function checkOut(Request $request)
    {
        $user = $request->user();
        $today = now()->format('Y-m-d');

        $record = AttendanceRecord::where('user_id', $user->id)
            ->where('date', $today)->first();

        if (!$record || !$record->check_in_at) {
            return response()->json(['message' => 'Must check in first'], 422);
        }

        if ($record->check_out_at) {
            return response()->json(['message' => 'Already checked out today'], 422);
        }

        $record->update(['check_out_at' => now()]);

        return response()->json($record);
    }

    public function todayStatus(Request $request)
    {
        $today = now()->format('Y-m-d');
        $record = AttendanceRecord::where('user_id', $request->user()->id)
            ->where('date', $today)->first();

        return response()->json([
            'record' => $record,
            'can_check_in' => !$record || !$record->check_in_at,
            'can_check_out' => $record && $record->check_in_at && !$record->check_out_at,
        ]);
    }
}
