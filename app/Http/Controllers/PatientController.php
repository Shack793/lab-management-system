<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    /**
     * Display a listing of patients.
     */
    public function index()
    {
        return response()->json(Patient::all());
    }

    /**
     * Store a newly created patient.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'other_name' => 'nullable|string|max:255',
            'gender' => 'required|string|in:male,female,other',
            'town' => 'required|string|max:255',
            'address' => 'required|string',
            'country' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'state' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'dob' => 'required|date',
            'nationality' => 'required|string|max:255',
            'language' => 'required|string|max:255',
            'id_type' => 'required|string|max:255',
            'id_number' => 'required|string|unique:patients,id_number',
            'email' => 'required|email|max:255',
            'postal_address' => 'nullable|string',
            'additional_info' => 'nullable|string',
            'photo' => 'nullable|string'
        ]);

        $patient = Patient::create($validated);
        return response()->json($patient, 201);
    }

    /**
     * Display a specific patient.
     */
    public function show(Patient $patient)
    {
        return response()->json($patient);
    }

    /**
     * Update a patient.
     */
    public function update(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'surname' => 'sometimes|string|max:255',
            'first_name' => 'sometimes|string|max:255',
            'other_name' => 'nullable|string|max:255',
            'gender' => 'sometimes|string|in:male,female,other',
            'town' => 'sometimes|string|max:255',
            'address' => 'sometimes|string',
            'country' => 'sometimes|string|max:255',
            'phone_number' => 'sometimes|string|max:20',
            'state' => 'sometimes|string|max:255',
            'city' => 'sometimes|string|max:255',
            'dob' => 'sometimes|date',
            'nationality' => 'sometimes|string|max:255',
            'language' => 'sometimes|string|max:255',
            'id_type' => 'sometimes|string|max:255',
            'id_number' => 'sometimes|string|unique:patients,id_number,'.$patient->id,
            'email' => 'sometimes|email|max:255',
            'postal_address' => 'nullable|string',
            'additional_info' => 'nullable|string',
            'photo' => 'nullable|string'
        ]);

        $patient->update($validated);
        return response()->json($patient);
    }

    /**
     * Remove a patient.
     */
    public function destroy(Patient $patient)
    {
        $patient->delete();
        return response()->json(['message' => 'Patient deleted successfully']);
    }

    public function uploadPhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|max:2048'
        ]);

        $path = $request->file('photo')->store('patient-photos', 'public');

        return response()->json([
            'url' => '/storage/' . $path
        ]);
    }
}


