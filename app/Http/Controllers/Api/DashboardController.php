<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AttendanceRecord;
use App\Models\LeaveRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $today = now()->format('Y-m-d');
        $user = $request->user();

        if ($user->role === 'employee') {
            $todayRecord = AttendanceRecord::where('user_id', $user->id)
                ->where('date', $today)->first();

            $recentAttendance = AttendanceRecord::where('user_id', $user->id)
                ->latest('date')->take(10)->get();

            $pendingLeaves = LeaveRequest::where('user_id', $user->id)
                ->where('status', 'pending')->count();

            return response()->json([
                'role' => 'employee',
                'today_record' => $todayRecord,
                'recent_attendance' => $recentAttendance,
                'pending_leaves' => $pendingLeaves,
            ]);
        }

        // HR/Manager dashboard
        $totalEmployees = User::whereIn('role', ['employee', 'manager'])->count();
        $presentToday = AttendanceRecord::where('date', $today)
            ->where('status', 'present')->count();
        $lateToday = AttendanceRecord::where('date', $today)
            ->where('status', 'late')->count();
        $absentToday = AttendanceRecord::where('date', $today)
            ->where('status', 'absent')->count();
        $pendingLeaveCount = LeaveRequest::where('status', 'pending')->count();

        $recentAttendance = AttendanceRecord::with('user')
            ->where('date', $today)->latest()->take(10)->get();

        $pendingLeaves = LeaveRequest::with('user')->where('status', 'pending')
            ->latest()->take(5)->get();

        $attendanceThisWeek = AttendanceRecord::selectRaw('date, COUNT(*) as total, SUM(CASE WHEN status = ? THEN 1 ELSE 0 END) as present', ['present'])
            ->whereBetween('date', [now()->startOfWeek()->format('Y-m-d'), now()->endOfWeek()->format('Y-m-d')])
            ->groupBy('date')->orderBy('date')->get();

        return response()->json([
            'role' => $user->role,
            'stats' => [
                'total_employees' => $totalEmployees,
                'present_today' => $presentToday,
                'late_today' => $lateToday,
                'absent_today' => $absentToday,
                'pending_leaves' => $pendingLeaveCount,
            ],
            'recent_attendance' => $recentAttendance,
            'pending_leaves' => $pendingLeaves,
            'attendance_this_week' => $attendanceThisWeek,
        ]);
    }
}
