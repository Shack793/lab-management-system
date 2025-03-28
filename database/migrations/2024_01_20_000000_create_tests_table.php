<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('abbreviation')->nullable();
            $table->string('test_category');
            $table->decimal('price', 10, 2);
            $table->integer('turnaround_time'); // in hours
            $table->json('result_options')->nullable();
            $table->string('result_unit')->nullable();
            $table->decimal('lower_limit', 10, 2)->nullable();
            $table->decimal('upper_limit', 10, 2)->nullable();
            $table->json('consultants')->nullable();
            $table->boolean('show_comment_in_report')->default(false);
            $table->text('comment')->nullable();
            $table->text('additional_information')->nullable();
            $table->text('additional_report_information')->nullable();
            $table->boolean('has_template')->default(false);
            $table->boolean('is_deprecated')->default(false);
            $table->enum('institution', ['leg', 'hand']);
            $table->string('gender');
            $table->float('age_lower_limit');
            $table->float('age_upper_limit');
            $table->string('age_unit');
            $table->float('normal_lower_limit');
            $table->float('normal_upper_limit');
            $table->float('critical_lower_limit');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tests');
    }
};

