import { Color } from "./support/deck";
import { GameEngine } from "./support/GameEngine";
import { GameState } from "./support/GameState";
import { Player } from "./support/Player";

export class TwoPlayerEngine implements GameEngine {

    setup(state: GameState): void {
        state.deck.shuffle();
        state.deck.discard(10);
        while (state.getHandSize() < 5) {
            state.playerDrawCard();
        }
    }

    runRound(state: GameState): void {
        state.playersPlayCard();
        state.playersPlayCard();

        state.flipUpCards();

        while (true) {
            if (state.deck.isEmpty() == false) {
                while (state.getHandSize() < 5) {
                    state.playerDrawCard();
                }
            }

            if (state.countCardsInPlay() == 4) {
                break;
            }
            state.playersPlayCard();
            state.flipUpCards();
        }

    }

    checkTooMany(state: GameState): void {
        if (state.countColor(Color.BLUE) >= 5) {
            state.discardColor(Color.BLUE);
        }

        if (state.countColor(Color.GREEN) >= 5) {
            state.discardColor(Color.GREEN);
        }

        if (state.countColor(Color.ORANGE) >= 5) {
            state.discardColor(Color.ORANGE);
        }

        if (state.countColor(Color.RED) >= 5) {
            state.discardColor(Color.RED);
        }

        if (state.countColor(Color.YELLOW) >= 5) {
            state.discardColor(Color.YELLOW);
        }

    }

    checkForOnes(state: GameState): void {
        if (state.countValue(1) === 4) {
            state.discardValue(2);
            state.discardValue(3);
            state.discardValue(4);
            state.discardValue(5);
            state.discardValue(6);
        }
    }

    checkForTies(state: GameState): void {
        const blueCount = state.countColor(Color.BLUE);
        const redCount = state.countColor(Color.RED);
        const greenCount = state.countColor(Color.GREEN);
        const orangeCount = state.countColor(Color.ORANGE);
        const yellowCount = state.countColor(Color.YELLOW);

        if (blueCount === redCount || blueCount === greenCount || blueCount == orangeCount || blueCount == yellowCount) {
            state.discardColor(Color.BLUE);
        }

        if (redCount === blueCount || redCount === greenCount || redCount == orangeCount || redCount == yellowCount) {
            state.discardColor(Color.RED);
        }

        if (greenCount === blueCount || greenCount === redCount || greenCount == orangeCount || greenCount == yellowCount) {
            state.discardColor(Color.GREEN);
        }

        if (orangeCount === blueCount || orangeCount === redCount || greenCount == orangeCount || orangeCount == yellowCount) {
            state.discardColor(Color.ORANGE);
        }

        if (yellowCount === blueCount || yellowCount === redCount || yellowCount == orangeCount || orangeCount == yellowCount) {
            state.discardColor(Color.YELLOW);
        }

    }

    cleanUp(state: GameState): string | null {
        state.score();
        
        if(state.deck.isEmpty() == false){
            return null;
        }

        let player1Score = state.getScore(0);
        let player2Score = state.getScore(1);

        if(player1Score > player2Score) {
            return "Player 1 wins!";
        }

        if(player2Score > player1Score) {
            return "Player 2 wins!";
        }

        return "The game was a tie!";

    }

    checkForMost(state: GameState): void {
        if (state.hasMost(Color.BLUE)) {
            state.discardColor(Color.ORANGE);
            state.discardColor(Color.RED);
            state.discardColor(Color.GREEN);
            state.discardColor(Color.YELLOW);
        } else if (state.hasMost(Color.ORANGE)) {
            state.discardColor(Color.BLUE);
            state.discardColor(Color.RED);
            state.discardColor(Color.GREEN);
            state.discardColor(Color.YELLOW);
        } else if (state.hasMost(Color.RED)) {
            state.discardColor(Color.ORANGE);
            state.discardColor(Color.BLUE);
            state.discardColor(Color.GREEN);
            state.discardColor(Color.YELLOW);
        } else if (state.hasMost(Color.GREEN)) {
            state.discardColor(Color.ORANGE);
            state.discardColor(Color.RED);
            state.discardColor(Color.BLUE);
            state.discardColor(Color.YELLOW);
        } else if (state.hasMost(Color.YELLOW)) {
            state.discardColor(Color.ORANGE);
            state.discardColor(Color.RED);
            state.discardColor(Color.BLUE);
            state.discardColor(Color.GREEN);
        }

    }

}