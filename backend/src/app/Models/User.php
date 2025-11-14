<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable 
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'user_id';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'username',
        'email',
        'nim',
        'phone_number',
        'address',
        'profile_picture',
        'profile_info',
        'fullname',
        'angkatan',
        'linkedin',
        'instagram',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */

    public function projects(){
        return $this->belongsToMany(Project::class, 'user_project', 'user_id', 'project_id')
                    ->withPivot('role'); // to access user’s role in the project
    }

    public function comments(){
        return $this->hasMany(Comment::class, 'user_id', 'user_id');
    }

}
