<?php

namespace Tests\Feature;

use App\Models\Test;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TestControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_tests(): void
    {
        Test::factory()->count(3)->create();

        $response = $this->getJson('/api/tests');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_can_create_test(): void
    {
        $testData = [
            'institution' => 'Test Hospital',
            'gender' => 'both',
            'age_lower_limit' => 18,
            'age_upper_limit' => 65,
            'age_unit' => 'years',
            'normal_lower_limit' => 10.5,
            'normal_upper_limit' => 20.5,
            'critical_lower_limit' => 5.5,
        ];

        $response = $this->postJson('/api/tests', $testData);

        $response->assertStatus(201)
            ->assertJson($testData);
    }

    public function test_can_update_test(): void
    {
        $test = Test::factory()->create();
        $updateData = [
            'institution' => 'Updated Hospital',
            'gender' => 'female',
            'age_lower_limit' => 20,
            'age_upper_limit' => 70,
            'age_unit' => 'years',
            'normal_lower_limit' => 11.5,
            'normal_upper_limit' => 21.5,
            'critical_lower_limit' => 6.5,
        ];

        $response = $this->putJson("/api/tests/{$test->id}", $updateData);

        $response->assertStatus(200)
            ->assertJson($updateData);
    }

    public function test_can_delete_test(): void
    {
        $test = Test::factory()->create();

        $response = $this->deleteJson("/api/tests/{$test->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('tests', ['id' => $test->id]);
    }
}