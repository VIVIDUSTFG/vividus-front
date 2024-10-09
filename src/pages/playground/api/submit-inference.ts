import { api } from '@/lib/data';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ params, request, locals }) => {
  try {
    const formData = await request.formData();

    const response = await fetch(api('/inference'), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${locals.user.access_token}`,
      },
      body: formData,
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
