import { api } from '@/lib/data';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request, locals }) => {
  try {
    const url = new URL(request.url);
    const submissionId = url.searchParams.get('submission-id');

    if (!submissionId) {
      return new Response(null, {
        status: 400,
        statusText: 'Missing submission parameter',
      });
    }


    const response = await fetch(api(`/submission/${submissionId}/scores`), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${locals.user.access_token}`,
      },
    });

    if (response.ok) {
      const responseBody = await response.json();
      return new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      const errorBody = await response.json();
      return new Response(null, {
        status: response.status,
        statusText: errorBody.detail || 'Unknown error',
      });
    }
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: 'Error fetching data',
    });
  }
};
