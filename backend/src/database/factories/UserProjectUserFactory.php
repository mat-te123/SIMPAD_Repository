<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserProject>
 */
class UserProjectUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::inRandomOrder()->first()->user_id,
            'project_id' => \App\Models\Project::inRandomOrder()->first()->project_id,
            'role' => $this->faker->randomElement(['Front-end', 'Back-end', 'UI/UX', 'Project Manager']),
        ];
    }
}
