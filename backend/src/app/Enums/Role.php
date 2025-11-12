<?php

namespace App\Enums;

// The ': string' part is important.
// It tells PHP that the value of each case is a string.
enum Role: string
{
    // The case name must be valid PHP (no numbers first)
    // The value must EXACTLY match your migration
    case PM = 'pm';
    case FE = 'fe';
    case BE = 'be';
    case DEV = 'dev';
    case UIUX = 'uiux';
}