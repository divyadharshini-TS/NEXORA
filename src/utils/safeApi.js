/**
 * safeApi.js — Safe fetch wrapper for NEXORA
 *
 * Why did "Unexpected token 'T', 'The page c'... is not valid JSON" occur?
 * 1. When calling an API endpoint on Vercel or when the backend is offline,
 *    the server or CDN returns an HTML/plain-text 404 page ("The page could not be found").
 * 2. When calling `res.json()` on that response, JavaScript attempts to parse
 *    "The page could not be found" as JSON. Because the text begins with 'T',
 *    JSON.parse throws: SyntaxError: Unexpected token 'T', "The page c"... is not valid JSON.
 *
 * This wrapper:
 *  - Checks Content-Type header before attempting to parse JSON.
 *  - Wraps all fetch calls and JSON parsing in try/catch.
 *  - Automatically prepends `VITE_API_URL` if set (for production deployments).
 *  - NEVER throws an unhandled error — always returns { data, error, status, isOffline }.
 */

const RAW_API_BASE = import.meta.env.VITE_API_URL || '';
const API_BASE = RAW_API_BASE.replace(/\/$/, '');

/**
 * Perform a safe network request.
 * Guaranteed to NEVER throw a JSON syntax error or crash on HTML/text 404 responses.
 *
 * @param {string} path - e.g. '/api/auth/login' or '/api/schemes'
 * @param {RequestInit} [options={}] - standard fetch options
 * @returns {Promise<{ data: any, error: string|null, status: number, isOffline: boolean }>}
 */
export async function apiFetch(path, options = {}) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${API_BASE}${cleanPath}`;

  try {
    const headers = {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    };

    const res = await fetch(url, {
      ...options,
      headers,
    });

    const contentType = res.headers.get('content-type') || '';

    // If server returned HTML, plain text or non-JSON (e.g., Vercel 404 "The page could not be found")
    if (!contentType.includes('application/json')) {
      const sampleText = await res.text().catch(() => '');
      const isNotFound = res.status === 404 || sampleText.toLowerCase().includes('page could not be found');
      
      return {
        data: null,
        error: isNotFound
          ? 'Backend endpoint not found. Server may be offline.'
          : `Server returned HTTP ${res.status}. Expected JSON response.`,
        status: res.status,
        isOffline: true,
      };
    }

    let data = null;
    try {
      data = await res.json();
    } catch {
      return {
        data: null,
        error: 'Failed to parse JSON response from server.',
        status: res.status,
        isOffline: true,
      };
    }

    if (!res.ok) {
      return {
        data: null,
        error: data?.message || data?.error || `Request failed with status ${res.status}`,
        status: res.status,
        isOffline: false,
      };
    }

    return { data, error: null, status: res.status, isOffline: false };
  } catch (err) {
    // Network offline / connection refused / DNS failure
    return {
      data: null,
      error: 'Cannot reach backend server. Operating in offline mode.',
      status: 0,
      isOffline: true,
    };
  }
}

/**
 * Convenience helper for GET requests
 */
export async function apiGet(path, token = null) {
  const authToken = token || localStorage.getItem('nexoraToken');
  return apiFetch(path, {
    method: 'GET',
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
  });
}

/**
 * Convenience helper for POST requests
 */
export async function apiPost(path, body, token = null) {
  const authToken = token || localStorage.getItem('nexoraToken');
  return apiFetch(path, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
  });
}
