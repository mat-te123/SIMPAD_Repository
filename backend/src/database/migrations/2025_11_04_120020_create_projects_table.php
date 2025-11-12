<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id('project_id')->unique();
            $table->string('title');
            $table->string('description');
            $table->string('cover_image_url');
            $table->string('youtube_vieo_url');
            $table->year('project_year');
            $table->enum('project_type',['pad1','pad2','pad12']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
