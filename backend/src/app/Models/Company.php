<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $primaryKey = 'company_id'; // Matches your migration

    protected $fillable = [ // Matches your migration
        'company_name',
        'company_image',
    ];
    
}