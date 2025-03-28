<?php

namespace App\Http\Controllers;

use App\Models\Nationality;
use Illuminate\Http\Request;

class NationalityController extends Controller
{
    public function index()
    {
        return response()->json(Nationality::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'country_name' => 'required|string|unique:nationalities,country_name|max:255',
            'nationality' => 'required|string|max:255',
        ]);

        $nationality = Nationality::create($validated);
        return response()->json($nationality, 201);
    }

    public function show(Nationality $nationality)
    {
        return response()->json($nationality);
    }

    public function update(Request $request, Nationality $nationality)
    {
        $validated = $request->validate([
            'country_name' => 'sometimes|string|unique:nationalities,country_name|max:255',
            'nationality' => 'sometimes|string|max:255',
        ]);

        $nationality->update($validated);
        return response()->json($nationality);
    }

    public function destroy(Nationality $nationality)
    {
        $nationality->delete();
        return response()->json(['message' => 'Nationality deleted successfully']);
    }
}
