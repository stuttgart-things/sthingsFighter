async function isServerReachable(url, timeout = 2000) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);

    return response.ok;
  } catch (error) {
    console.warn('Server not reachable:', error.message);
    return false;
  }
}

export async function startSSE(url) {

  const reachable = await isServerReachable(url);
  if (!reachable) {
    console.log('Skipping polling: server not available.');
    return;
  }

  console.log('Server reachable. Connecting to SSE...');

  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('SSE message received:', data);
    // Handle the message in your game logic
  };

  eventSource.onerror = (err) => {
    console.error('SSE connection error:', err);
    eventSource.close();
    checkAndStartSSE(url); // Retry connection
  };
}

function checkAndStartSSE(url) {

  const retryInterval = 10000; // 10 seconds

  const intervalId = setInterval(async () => {
    const reachable = await isServerReachable(url);
    if (reachable) {
      clearInterval(intervalId); // Stop retrying
      startSSE(url);             // Start SSE connection
    } else {
      console.log('SSE server still unreachable. Retrying...');
    }
  }, retryInterval);
}

