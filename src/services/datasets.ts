import { api } from '@/lib/data';

// -- GENERAL SERVICES -- //

export async function getBestSubmissions(authorization: string) {
  try {
    const response = await fetch(api('/scores/best-submissions'), {
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

export async function getDatasetList(authorization: string) {
  try {
    const response = await fetch(api('/dataset'), {
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

export async function getDatasetDetails(authorization: string, dataset: string) {
  try {
    const response = await fetch(api(`/dataset/detail/${dataset}`), {
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


export async function getDatasetLeaderboard(authorization: string, dataset: string) {
  try {
    const response = await fetch(api(`/dataset/${dataset}/submissions-leaderboard`), {
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