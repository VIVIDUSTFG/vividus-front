import { api } from '@/lib/data';

export async function submitEvaluation(authorization: string, dataset_accessor: string, submission_accessor: string) {
  try {
    const response = await fetch(api(`/evaluation`), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authorization}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dataset_accessor: dataset_accessor, submission_accessor: submission_accessor }),
    });

    console.log(response);

    if (response.ok) {
      return new Response(null, {
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
      statusText: 'Error submitting data',
    });
  }
}
