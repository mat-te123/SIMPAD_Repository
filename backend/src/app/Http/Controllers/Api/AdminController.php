<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Project;
use App\Models\Company;
use App\Models\Comment;

class AdminController extends Controller
{
    // ... (Keep your existing getAll functions here) ...

    public function getAllUsers()
    {
        $users = User::all();
        return response()->json(['status' => 'success', 'data' => $users, 'total' => $users->count()], 200);
    }

    public function getAllProjects()
    {
        $projects = Project::with('users')->get(); // Tip: Use 'with' to eager load relations if needed
        return response()->json(['status' => 'success', 'data' => $projects, 'total' => $projects->count()], 200);
    }

    public function getAllCompanies()
    {
        $companies = Company::all();
        return response()->json(['status' => 'success', 'data' => $companies, 'total' => $companies->count()], 200);
    }

    public function getAllComments()
    {
        $comments = Comment::with('project', 'user')->get(); // Eager load related project and user
        return response()->json(['status' => 'success', 'data' => $comments, 'total' => $comments->count()], 200);
    }
    
    public function AddCompany(Request $request)
    {
        // ... (Keep existing AddCompany logic) ...
        $request->validate([
            'company_name' => 'required|string|max:255',
            'company_image' => 'required|image|max:2048',
        ]);

        $imagePath = $request->file('company_image')->store('company_images', 'public');

        $company = Company::create([
            'company_name' => $request->company_name,
            'company_image' => $imagePath,
        ]);

        return response()->json(['status' => 'success', 'message' => 'Company added successfully', 'data' => $company], 201);
    }

    // --- NEW DELETE FUNCTIONS ---

    public function deleteUser($id)
    {
        $user = User::find($id);
        if (!$user) return response()->json(['message' => 'User not found'], 404);
        
        $user->delete(); // Ensure your DB handles cascading deletes (projects belonging to user)
        return response()->json(['status' => 'success', 'message' => 'User deleted successfully']);
    }

    public function deleteProject($id)
    {
        $project = Project::find($id);
        if (!$project) return response()->json(['message' => 'Project not found'], 404);

        $project->delete();
        return response()->json(['status' => 'success', 'message' => 'Project deleted successfully']);
    }

    public function deleteCompany($id)
    {
        $company = Company::find($id);
        if (!$company) return response()->json(['message' => 'Company not found'], 404);

        // Optional: Delete the image file from storage before deleting record
        // Storage::disk('public')->delete($company->company_image);

        $company->delete();
        return response()->json(['status' => 'success', 'message' => 'Company deleted successfully']);
    }

    public function deleteComment($id)
    {
        $comment = Comment::find($id);
        if (!$comment) return response()->json(['message' => 'Comment not found'], 404);

        $comment->delete();
        return response()->json(['status' => 'success', 'message' => 'Comment deleted successfully']);
    }
}