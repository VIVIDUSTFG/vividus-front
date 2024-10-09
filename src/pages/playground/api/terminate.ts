import { api } from '@/lib/data';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ params, request, locals }) => {
  try {
    const url = new URL(request.url);
    const workflowName = url.searchParams.get('workflow');

    const response = await fetch(api(`/inference/terminate/${workflowName}`), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${locals.user.access_token}`,
      },
    });

    if (response.ok) {
      return new Response(null, {
        status: 200,
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
