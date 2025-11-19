<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserProject extends Pivot
{
    protected $table = 'user_projects';

    protected $fillable = [
        'user_id',
        'project_id',
        'role'
    ];
}