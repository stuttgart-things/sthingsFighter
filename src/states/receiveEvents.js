import { BattleScene } from "../scenes/BattleScene";

async function isServerReachable(url, timeout = 5000) {
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

function checkAndStartSSE(url, battleSceneInstance) {
  console.log('Received battleSceneInstance:', battleSceneInstance);
  const retryInterval = 10000; // 10 seconds

  const intervalId = setInterval(async () => {
    const reachable = await isServerReachable(url);
    if (reachable) {
      clearInterval(intervalId); // Stop retrying
      startSSE(url, battleSceneInstance);             // Start SSE connection
    } else {
      console.log('SSE server still unreachable. Retrying...');
    }
  }, retryInterval);
}

export async function startSSE(url, battleSceneInstance) {

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

    // Update the instance
    battleSceneInstance.text = data.message;
    battleSceneInstance.showText = true;

  };

  eventSource.onerror = (err) => {
    console.error('SSE connection error:', err);
    eventSource.close();
    checkAndStartSSE(url); // Retry connection
  };
}

