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
            $table->text('description');
            $table->string('cover_image_url');  
            $table->string('youtube_video_url');
            $table->year('project_year');
            $table->enum('project_type',['PAD 1','PAD 2','PAD 1 dan 2']);
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