<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;


class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username' => 'Admin1',
            'email' => 'delvianokhayruattahira@mail.ugm.ac.id',
            'user_role' => 'admin',
        ]);

        $this->command->info('Admin user created successfully.');
    }
}
