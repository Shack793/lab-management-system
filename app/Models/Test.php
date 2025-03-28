<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'abbreviation',
        'test_category',
        'price',
        'turnaround_time',
        'result_options',
        'result_unit',
        'lower_limit',
        'upper_limit',
        'consultants',
        'show_comment_in_report',
        'comment',
        'additional_information',
        'additional_report_information',
        'has_template',
        'is_deprecated',
        'institution',
        'gender',
        'age_lower_limit',
        'age_upper_limit',
        'age_unit',
        'normal_lower_limit',
        'normal_upper_limit',
        'critical_lower_limit',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'lower_limit' => 'decimal:2',
        'upper_limit' => 'decimal:2',
        'result_options' => 'array',
        'consultants' => 'array',
        'show_comment_in_report' => 'boolean',
        'has_template' => 'boolean',
        'is_deprecated' => 'boolean',
        'age_lower_limit' => 'float',
        'age_upper_limit' => 'float',
        'normal_lower_limit' => 'float',
        'normal_upper_limit' => 'float',
        'critical_lower_limit' => 'float',
    ];
}

