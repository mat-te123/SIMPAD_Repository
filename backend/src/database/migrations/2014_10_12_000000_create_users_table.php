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
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id')->unique();
            $table->string('username');
            $table->string('email')->unique();
            $table->string('profile_info')->nullable();
            $table->enum('user_role', ['admin', 'member'])->default('member');
            $table->string('fullname')->nullable();
            $table->string('angkatan')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('instagram')->nullable();    
            $table->string('phone_number')->nullable();
            $table->string('address')->nullable();
            $table->string('nim')->nullable();
            $table->string('profile_picture')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
