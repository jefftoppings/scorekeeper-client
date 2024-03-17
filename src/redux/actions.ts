import { SET_GAME_CONFIG, GET_GAME_CONFIG } from './actionTypes';
import { MexicanTrainGameConfig } from './types';

export const setGameConfig = (config: MexicanTrainGameConfig) => ({
  type: SET_GAME_CONFIG as typeof SET_GAME_CONFIG,
  payload: config,
});

export const getGameConfig = () => ({
  type: GET_GAME_CONFIG as typeof GET_GAME_CONFIG,
});