<?php

namespace Database\Factories;

use App\Models\Test;
use Illuminate\Database\Eloquent\Factories\Factory;

class TestFactory extends Factory
{
    protected $model = Test::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'abbreviation' => $this->faker->optional()->lexify('???'),
            'test_category' => $this->faker->word,
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'turnaround_time' => $this->faker->numberBetween(1, 72),
            'result_options' => $this->faker->optional()->words,
            'result_unit' => $this->faker->optional()->word,
            'lower_limit' => $this->faker->optional()->randomFloat(2, 0, 50),
            'upper_limit' => $this->faker->optional()->randomFloat(2, 51, 100),
            'consultants' => $this->faker->optional()->words,
            'show_comment_in_report' => $this->faker->boolean,
            'comment' => $this->faker->optional()->sentence,
            'additional_information' => $this->faker->optional()->paragraph,
            'additional_report_information' => $this->faker->optional()->paragraph,
            'has_template' => $this->faker->boolean,
            'is_deprecated' => $this->faker->boolean,
            'institution' => $this->faker->randomElement(['leg', 'hand']),
            'gender' => $this->faker->randomElement(['male', 'female', 'both']),
            'age_lower_limit' => $this->faker->numberBetween(0, 50),
            'age_upper_limit' => $this->faker->numberBetween(51, 100),
            'age_unit' => $this->faker->randomElement(['years', 'months', 'days']),
            'normal_lower_limit' => $this->faker->randomFloat(2, 0, 50),
            'normal_upper_limit' => $this->faker->randomFloat(2, 51, 100),
            'critical_lower_limit' => $this->faker->randomFloat(2, 0, 30),
        ];
    }
}
