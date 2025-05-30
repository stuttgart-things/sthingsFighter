import { FighterId } from '../constants/fighter.js';
import { createDefaultFighterState } from './fighterState.js';
import { resetSessionId } from './generateGameSessionID.js';

export var gameState = {
	fighters: [
		createDefaultFighterState(FighterId.RYU),
		createDefaultFighterState(FighterId.KEN),
	],
};

export const resetGameState = () => {
	resetSessionId(); 
	gameState = {
		fighters: [
			createDefaultFighterState(FighterId.RYU),
			createDefaultFighterState(FighterId.KEN),
		],
	};
};
