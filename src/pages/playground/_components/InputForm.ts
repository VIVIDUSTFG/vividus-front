import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { api } from '../../../lib/data';

let workflowName: string | null = null;

const form = document.querySelector('#videoForm');

const ffmpeg = new FFmpeg();

await ffmpeg.load({
  coreURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.js',
});

ffmpeg.on('log', ({ message }) => {
  console.log(message);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Process the video
  const file = document.querySelector('input[type="file"]').files[0];
  const formData = new FormData(form);

  if (!file) {
    console.error('No file selected');
    return;
  }

  const loadingViewResponse = await fetch('/playground/api/loading-screen', {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  if (loadingViewResponse.ok) {
    const loadingViewHtml = await loadingViewResponse.text();
    // document.body.innerHTML = loadingViewHtml;
    document.querySelector('#loading-screen').innerHTML = loadingViewHtml;
  }

  ffmpeg
    .writeFile(file.name, await fetchFile(file))
    .then(() =>
      ffmpeg.exec([
        '-i',
        file.name,
        '-vf',
        'scale=640:272',
        '-r',
        '25',
        '-c:v',
        'libx264',
        '-c:a',
        'aac',
        '-ac',
        '2',
        'output.mp4',
      ])
    )
    .then(() => ffmpeg.readFile('output.mp4'))
    .then(async (data) => {
      if (data.length > 0) {
        const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });
        formData.delete('file');
        formData.append('file', videoBlob, 'output.mp4');

        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
        });

        if (response.ok) {
          console.log('File uploaded successfully');
          const jsonResponse = await response.json();
          workflowName = jsonResponse.workflow_name;

          // Call the function to listen to workflow events

          listenToWorkflowEvents(workflowName);
        } else {
          window.location.href = '/playground/submission-error';
        }
      }
    })
    .finally(() => {
      ffmpeg.terminate();
    })
    .catch((error) => {
      console.error('Error processing video:', error);
    });
});

function listenToWorkflowEvents(workflowName) {
  const eventUrl = api(`/inference/events/${workflowName}`);
  console.log('Event URL:', eventUrl);
  const eventSource = new EventSource(eventUrl);

  eventSource.onmessage = async function (event) {
    // const statusDiv = document.getElementById("status");
    // statusDiv.innerHTML += `<p>${event.data}</p>`;
    console.log(event.data);

    if (event.data.includes('Workflow')) {
      if (event.data.includes('Succeeded')) {
        eventSource.close();
        const resultsViewResponse = await fetch(`/playground/api/results-aside?workflow=${workflowName}`, {
          headers: {
            'HX-Long-Request': 'true',
          },
        });
        if (resultsViewResponse.ok) {
          const resultsViewHtml = await resultsViewResponse.text();
          const parser = new DOMParser();
          const tempDocument = parser.parseFromString(resultsViewHtml, 'text/html');
          const targetElement = tempDocument.getElementById('violent-intervals');
          if (targetElement) {
            document.getElementById('videoPreview')?.classList.add('shadow-[0px_0px_100px_0px_#feb2b2]');
          } else {
            document.getElementById('videoPreview')?.classList.add('shadow-[0px_0px_100px_0px_#b2feb6]');
          }

          document.querySelector('#content-aside-form').innerHTML = resultsViewHtml;
          
          document.querySelector('#loading-screen').innerHTML = '';
        } else {
          window.location.href = `/playground/submission-error?workflow=${workflowName}`;
          // const response = await resultsViewResponse.json();
          // console.log(response);
        }
      } else if (event.data.includes('Failed') || event.data.includes('Error')) {
        eventSource.close();
        window.location.href = `/playground/submission-error?workflow=${workflowName}`;
      }
    } else if (event.data.includes('Pod')) {
      if (event.data.includes('logs:')) {
        const logIndex = event.data.indexOf('logs:');
        const logContent = event.data.slice(logIndex + 5).trim();
        console.error('Pod Logs:', logContent);
      }
    }
  };

  eventSource.onerror = function (err) {
    console.error('EventSource failed: ', err);
    eventSource.close();
  };
}

window.addEventListener('beforeunload', function (event) {
  // Send a request to the server when the user navigates away
  if (workflowName === null) {
    return;
  }

  navigator.sendBeacon(
    `/playground/api/terminate?workflow=${workflowName}`,
    JSON.stringify({
      flag: 'user-left-page',
      timestamp: new Date().toISOString(),
    })
  );
});
