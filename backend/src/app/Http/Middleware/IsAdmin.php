<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
    // Check if user exists AND if they are an admin
    if (!$request->user() || $request->user()->user_role !== 'admin') {
        return response()->json([
            'status' => 'error',
            'message' => 'Unauthorized. Admin access only.'
        ], 403);
    }
    
    return $next($request);
    }
}