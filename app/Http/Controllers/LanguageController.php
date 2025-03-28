<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function index()
    {
        return response()->json(Language::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:languages,name|max:255',
        ]);

        $language = Language::create($validated);
        return response()->json($language, 201);
    }

    public function show(Language $language)
    {
        return response()->json($language);
    }

    public function update(Request $request, Language $language)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|unique:languages,name|max:255',
        ]);

        $language->update($validated);
        return response()->json($language);
    }

    public function destroy(Language $language)
    {
        $language->delete();
        return response()->json(['message' => 'Language deleted successfully']);
    }
}

