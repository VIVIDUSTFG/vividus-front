// -- RESULTS SERVICE --
import { api } from '@/lib/data';

export async function getWorkflowResults(authorization: string, workflow: string) {
  try {
    const response = await fetch(api(`/inference/result/${workflow}`), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authorization}`,
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
}
