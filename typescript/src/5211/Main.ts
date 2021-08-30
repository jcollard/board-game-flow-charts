import { Card, Color } from "./support/deck";
import { GameEngine } from "./support/GameEngine";
import { GameState } from "./support/GameState";
import { Player } from "./support/Player";
import { prompt } from "./support/Utils";
import { TwoPlayerEngine } from "./TwoPlayerEngine";


async function main() {
    console.log("5-2-1-1 Simulator!");

    const state: GameState = new GameState(2);
    const engine: GameEngine = new TwoPlayerEngine();

    console.log(state.toString());
    engine.setup(state);
    console.log(state.toString());
    let round: number = 0;
    let winner: string | null = null;
    while (winner === null) {
        round++;
        console.log(`\n=-=-=-=-=-=-=`);
        console.log(`- Round: ${round} -`);
        console.log(`=-=-=-=-=-=-=\n`);
        await prompt("Press Enter to see run the next round.");
        engine.runRound(state);
        console.log(state.toString());
        await prompt("Press Enter to score the round.");
        engine.checkForOnes(state);
        engine.checkTooMany(state);
        engine.checkForTies(state);
        engine.checkForMost(state);
        winner = engine.cleanUp(state);
        console.log(state.toString());
    }
    console.log(winner);
}

main();