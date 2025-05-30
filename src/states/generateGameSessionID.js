export function generateSessionId() {
  return 'xxxx-xxxx-4xxx-yxxx-xxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

let sessionId = generateSessionId();

export function resetSessionId() {
  sessionId = generateSessionId();
}

export function getSessionId() {
  return sessionId;
}
