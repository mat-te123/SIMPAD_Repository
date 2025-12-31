<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => 'Proyek ' . $this->faker->unique()->numberBetween(1, 100),
            'description' => 'This is a sample description for the project.',
            'cover_image_url' => 'cover_images/cVuEtbe8I2G9whqPDkpYZIuOEJnwzn8crVOpE3SE.png',
            'youtube_video_url' => 'https://youtube.com/watch?v=example',
            'project_year' => 2024,
            // Randomly picks one of your enum values
            'project_type' => $this->faker->randomElement(['PAD 1', 'PAD 2', 'PAD 1 dan 2']),
        ];
    }
}
