import { GameState } from "./GameState";
import { Player } from "./Player";

export interface GameEngine {
    setup(state: GameState): void;
    runRound(state: GameState): void;
    checkTooMany(state: GameState): void;
    checkForOnes(state: GameState): void;
    checkForTies(state: GameState): void;
    cleanUp(state: GameState): string | null;
    checkForMost(state: GameState): void;
}