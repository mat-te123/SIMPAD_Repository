<?php

namespace App\Enums;

// The ': string' part is important.
// It tells PHP that the value of each case is a string.
enum UserRole: string
{
    // The case name must be valid PHP (no numbers first)
    // The value must EXACTLY match your migration
    case ADMIN = 'admin';
    case MEMBER = 'member';
}