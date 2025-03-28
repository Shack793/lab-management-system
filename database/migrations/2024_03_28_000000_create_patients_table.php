<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('surname');
            $table->string('first_name');
            $table->string('other_name')->nullable();
            $table->enum('gender', ['male', 'female', 'other']);
            $table->string('town');
            $table->string('address');
            $table->string('country');
            $table->string('phone_number');
            $table->string('state');
            $table->string('city');
            $table->date('dob');
            $table->string('nationality');
            $table->string('language');
            $table->string('id_type');
            $table->string('id_number')->unique();
            $table->string('email');
            $table->string('postal_address')->nullable();
            $table->text('additional_info')->nullable();
            $table->string('photo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};