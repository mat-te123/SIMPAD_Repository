<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;
    protected $primaryKey = 'project_id';
    protected $fillable = [
        'project_id',
        'title',
        'description',
        'cover_image_url',
        'youtube_video_url',
        'project_year',
        'project_type',
        'created_at',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_project', 'project_id', 'user_id')
                    ->withPivot('role');
    }
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'project_id', 'project_id');
    }
}
