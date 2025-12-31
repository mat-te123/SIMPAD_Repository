<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\User;

class UserProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = Project::all();

        if ($projects->isEmpty()) {
            $this->command->error("No projects found! Run ProjectDataSeeder first.");
            return;
        }

        foreach ($projects as $project) {
            // syncWithoutDetaching prevents duplicate rows if you run it twice
            $project->users()->syncWithoutDetaching([
                1 => ['role' => 'Project Manager'],
                2 => ['role' => 'Front-end'],
                3 => ['role' => 'Back-end'],
                4 => ['role' => 'UI/UX'],

            ]);
        }
        
        $this->command->info("Successfully attached users to " . $projects->count() . " projects.");
    }
}