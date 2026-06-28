<?php

namespace Database\Seeders;

use App\Models\AttendanceRecord;
use App\Models\LeaveRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create HR user
        $hr = User::factory()->create([
            'name' => 'HR Manager',
            'email' => 'hr@company.com',
            'password' => bcrypt('password'),
            'role' => 'hr',
        ]);

        // Create Manager
        $manager = User::factory()->create([
            'name' => 'Team Manager',
            'email' => 'manager@company.com',
            'password' => bcrypt('password'),
            'role' => 'manager',
        ]);

        // Create Employees
        $employees = [];
        $employeeNames = [
            'Alice Johnson', 'Bob Smith', 'Carol Williams',
            'David Brown', 'Eva Martinez', 'Frank Garcia',
            'Grace Lee', 'Henry Wilson',
        ];

        foreach ($employeeNames as $name) {
            $employees[] = User::factory()->create([
                'name' => $name,
                'email' => strtolower(str_replace(' ', '.', $name)) . '@company.com',
                'password' => bcrypt('password'),
                'role' => 'employee',
            ]);
        }

        // Create attendance records for the past 3 weeks
        $allUsers = [$hr, $manager, ...$employees];
        $startDate = now()->subWeeks(3)->startOfWeek();

        for ($day = 0; $day < 15; $day++) {
            $date = $startDate->copy()->addDays($day);

            // Skip weekends
            if ($date->isWeekend()) continue;

            foreach ($allUsers as $user) {
                $checkInHour = rand(7, 9);
                $checkInMin = rand(0, 59);
                $status = $checkInHour >= 9 && $checkInMin > 0 ? 'late' : 'present';

                // 10% chance of absence
                if (rand(1, 100) <= 10 && $user->role === 'employee') {
                    AttendanceRecord::create([
                        'user_id' => $user->id,
                        'date' => $date->format('Y-m-d'),
                        'status' => 'absent',
                        'notes' => 'No check-in recorded',
                    ]);
                    continue;
                }

                $checkIn = $date->copy()->setTime($checkInHour, $checkInMin);
                $checkOutHour = rand(16, 18);
                $checkOut = $date->copy()->setTime($checkOutHour, rand(0, 59));

                AttendanceRecord::create([
                    'user_id' => $user->id,
                    'date' => $date->format('Y-m-d'),
                    'check_in_at' => $checkIn,
                    'check_out_at' => $checkOut,
                    'status' => $status,
                ]);
            }
        }

        // Create some leave requests
        $leaveData = [
            ['user' => $employees[0], 'type' => 'vacation', 'status' => 'approved', 'days' => 3],
            ['user' => $employees[1], 'type' => 'sick', 'status' => 'pending', 'days' => 2],
            ['user' => $employees[2], 'type' => 'personal', 'status' => 'approved', 'days' => 1],
            ['user' => $employees[3], 'type' => 'vacation', 'status' => 'pending', 'days' => 5],
            ['user' => $employees[4], 'type' => 'sick', 'status' => 'rejected', 'days' => 1],
        ];

        foreach ($leaveData as $ld) {
            $start = now()->addDays(rand(1, 14));
            LeaveRequest::create([
                'user_id' => $ld['user']->id,
                'start_date' => $start->format('Y-m-d'),
                'end_date' => $start->copy()->addDays($ld['days'] - 1)->format('Y-m-d'),
                'type' => $ld['type'],
                'status' => $ld['status'],
                'reason' => 'Leave request for ' . $ld['type'] . ' leave',
                'handled_by' => $ld['status'] !== 'pending' ? $hr->id : null,
                'admin_notes' => $ld['status'] === 'rejected' ? 'Insufficient team coverage during this period' : null,
            ]);
        }

        $this->command->info('Database seeded successfully!');
        $this->command->info('HR Login: hr@company.com / password');
        $this->command->info('Manager Login: manager@company.com / password');
        $this->command->info('Employee Login: alice.johnson@company.com / password');
    }
}
