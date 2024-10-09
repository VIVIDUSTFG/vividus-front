// import entity type
import { api } from '@/lib/data';

// -- EXPLORE SERVICES -- //

export async function getAllPublishedSubmissions(authorization: string) {
  try {
    const response = await fetch(api('/submission/published'), {
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

// -- DETAILS SERVICES -- //

export async function getSubmissionDetails(authorization: string, accessor: string) {
  try {
    const response = await fetch(api(`/submission/model/${accessor}`), {
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

export async function publishSubmission(authorization: string, id: string) {
  try {
    const response = await fetch(api(`/submission/${id}/status`), {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authorization}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'published' }),
    });

    if (response.ok) {
      return new Response(null, {
        status: 204,
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

export async function getSubmissionRank(authorization: string, id: string) {
  try {
    const response = await fetch(api(`/submission/${id}/rank`), {
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

export async function getSubmissionResults(authorization: string, id: string) {
  try {
    const response = await fetch(api(`/submission/${id}/results`), {
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

export async function getSubmissionTestRecords(authorization: string, id: string) {
  try {
    const response = await fetch(api(`/submission/${id}/test-records`), {
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

// -- ADMIN MANAGEMENT SERVICES -- //

export async function getAllPendingSubmissions(authorization: string) {
  try {
    const response = await fetch(api('/submission/pending'), {
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

export async function reviewSubmission(authorization: string, review: object, id: string) {
  try {
    const response = await fetch(api(`/submission/${id}/review`), {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authorization}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
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
}

// -- USER SUBMISSIONS SERVICES -- //

export async function getUserSubmissions(authorization: string, id: string) {
  try {
    const response = await fetch(api(`/submission/user/${id}`), {
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

export async function createSubmission(authorization: string, submission: object) {
  try {
    const response = await fetch(api('/submission'), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authorization}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
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
}

export async function editSubmission(authorization: string, submission: object, id: string) {
  try {
    const response = await fetch(api(`/submission/${id}`), {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authorization}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
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
}

export async function submitSubmission(authorization: string, id: string) {
  try {
    const response = await fetch(api(`/submission/${id}/submit`), {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authorization}`,
      },
    });

    if (response.ok) {
      return new Response(null, {
        status: 204,
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

export async function deleteSubmission(authorization: string, accessor: string) {
  try {
    const response = await fetch(api(`/submission/${accessor}`), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authorization}`,
      },
    });

    if (response.ok) {
      return new Response(null, {
        status: 204,
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

export async function unpublishSubmission(authorization: string, id: string) {
  try {
    const response = await fetch(api(`/submission/${id}/status`), {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authorization}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'in_review' }),
    });

    if (response.ok) {
      return new Response(null, {
        status: 204,
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
