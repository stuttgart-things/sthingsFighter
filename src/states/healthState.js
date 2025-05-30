

export const HEALTH_MAX_HIT_POINTS_STATE = 200;

export const currentHealth = {
  Ryu: HEALTH_MAX_HIT_POINTS_STATE,
  Ken: HEALTH_MAX_HIT_POINTS_STATE
};

export function resetHealth() {
  for (let character in currentHealth) {
    currentHealth[character] = HEALTH_MAX_HIT_POINTS_STATE;
  }
}
