export const HEALTH_MAX_HIT_POINTS_STATE = 500; //default 200 - also change in /constants/battle.js 

export const currentHealth = {
  Ryu: HEALTH_MAX_HIT_POINTS_STATE,
  Ken: HEALTH_MAX_HIT_POINTS_STATE
};

export function resetHealth() {
  for (let character in currentHealth) {
    currentHealth[character] = HEALTH_MAX_HIT_POINTS_STATE;
  }
}
