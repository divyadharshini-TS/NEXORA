/**
 * safeApi.js — Safe fetch wrapper for NEXORA
 *
 * Problem: When the backend is down, Vite's dev server returns an HTML 404 page.
 * Calling .json() on that throws: "Unexpected token 'T', "The page c"... is not valid JSON"
 *
 * This helper:
 *  1. Checks Content-Type before calling .json()
 *  2. Returns a structured error object instead of throwing
 *  3. Works for both local dev (proxy) and production (VITE_API_URL)
 */

const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * Makes a safe fetch request to the backend API.
 * Always returns { data, error, status } — never throws.
 *
 * @param {string} path - API path e.g. '/api/schemes'
 * @param {RequestInit} options - fetch options
 * @returns {Promise<{ data: any, error: string|null, status: number }>}
 */
export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    const contentType = res.headers.get('content-type') || '';

    // If response is not JSON (e.g. HTML error page from proxy), handle gracefully
    if (!contentType.includes('application/json')) {
      const text = await res.text();
      console.warn(`[API] Non-JSON response from ${path} (${res.status}):`, text.slice(0, 120));
      return {
        data: null,
        error: res.ok
          ? 'Server returned unexpected response format.'
          : `Server error ${res.status}. Backend may be offline.`,
        status: res.status,
      };
    }

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: data?.message || data?.error || `Request failed (${res.status})`,
        status: res.status,
      };
    }

    return { data, error: null, status: res.status };
  } catch (err) {
    // Network error (backend completely unreachable)
    console.error(`[API] Network error calling ${path}:`, err.message);
    return {
      data: null,
      error: 'Cannot reach server. Please check your connection.',
      status: 0,
    };
  }
}

/**
 * Convenience: GET request with optional auth token
 */
export async function apiGet(path, token = null) {
  return apiFetch(path, {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

/**
 * Convenience: POST request with JSON body and optional auth token
 */
export async function apiPost(path, body, token = null) {
  return apiFetch(path, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}
