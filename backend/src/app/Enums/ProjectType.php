<?php

namespace App\Enums;

// The ': string' part is important.
// It tells PHP that the value of each case is a string.
enum ProjectType: string
{
    // The case name must be valid PHP (no numbers first)
    // The value must EXACTLY match your migration
    case PAD1 = 'pad1';
    case PAD2 = 'pad2';
    case PAD12 = 'pad12';
}