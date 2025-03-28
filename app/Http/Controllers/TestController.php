<?php

namespace App\Http\Controllers;

use App\Models\Test;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TestController extends Controller
{
    public function index(): JsonResponse
    {
        $tests = Test::all();
        return response()->json($tests);
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'abbreviation' => 'nullable|string',
                'test_category' => 'required|string',
                'price' => 'required|numeric|min:0',
                'turnaround_time' => 'required|integer|min:0',
                'result_options' => 'nullable|array',
                'result_unit' => 'nullable|string',
                'lower_limit' => 'nullable|numeric',
                'upper_limit' => 'nullable|numeric',
                'consultants' => 'nullable|array',
                'show_comment_in_report' => 'boolean',
                'comment' => 'nullable|string',
                'additional_information' => 'nullable|string',
                'additional_report_information' => 'nullable|string',
                'has_template' => 'boolean',
                'is_deprecated' => 'boolean',
                'institution' => 'required|in:leg,hand',
                'gender' => 'required|string',
                'age_lower_limit' => 'required|numeric',
                'age_upper_limit' => 'required|numeric',
                'age_unit' => 'required|string',
                'normal_lower_limit' => 'required|numeric',
                'normal_upper_limit' => 'required|numeric',
                'critical_lower_limit' => 'required|numeric',
            ]);

            $test = Test::create($validated);
            return response()->json($test, 201);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    public function show(Test $test): JsonResponse
    {
        return response()->json($test);
    }

    public function update(Request $request, Test $test): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'abbreviation' => 'nullable|string',
                'test_category' => 'required|string',
                'price' => 'required|numeric|min:0',
                'turnaround_time' => 'required|integer|min:0',
                'result_options' => 'nullable|array',
                'result_unit' => 'nullable|string',
                'lower_limit' => 'nullable|numeric',
                'upper_limit' => 'nullable|numeric',
                'consultants' => 'nullable|array',
                'show_comment_in_report' => 'boolean',
                'comment' => 'nullable|string',
                'additional_information' => 'nullable|string',
                'additional_report_information' => 'nullable|string',
                'has_template' => 'boolean',
                'is_deprecated' => 'boolean',
                'institution' => 'required|in:leg,hand',
                'gender' => 'required|string',
                'age_lower_limit' => 'required|numeric',
                'age_upper_limit' => 'required|numeric',
                'age_unit' => 'required|string',
                'normal_lower_limit' => 'required|numeric',
                'normal_upper_limit' => 'required|numeric',
                'critical_lower_limit' => 'required|numeric',
            ]);

            $test->update($validated);
            return response()->json($test);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    public function destroy(Test $test): JsonResponse
    {
        $test->delete();
        return response()->json(null, 204);
    }
}

