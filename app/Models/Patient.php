<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'title',
        'surname',
        'first_name',
        'other_name',
        'gender',
        'town',
        'address',
        'country',
        'phone_number',
        'state',
        'city',
        'dob',
        'nationality',
        'language',
        'id_type',
        'id_number',
        'email',
        'postal_address',
        'additional_info',
        'photo'
    ];
}



