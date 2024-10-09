import type { APIContext } from 'astro';
import { unpublishSubmission } from '../../../../services';

export async function POST({ request, redirect, locals }: APIContext) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response(null, {
      status: 400,
      statusText: 'Bad Request',
    });
  }

  try {
    const response = await unpublishSubmission(locals.user.access_token, id);
    if (!response.ok) {
      return new Response(null, {
        status: response.status,
        statusText: response.statusText,
      });
    } else {
      return new Response(null, {
        status: 303,
      });
    }
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: 'Error submitting submission',
    });
  }
}
