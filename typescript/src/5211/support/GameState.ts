import { ALL_COLORS, Card, Color, Deck } from "./deck";
import { Player } from "./Player";

export class GameState {

    public players : Player[];
    public deck: Deck;

    public constructor(numPlayers: number) {
        this.deck = new Deck();
        this.players = [];
        for(let ix = 0; ix < numPlayers; ix++){
            this.players.push(new Player());
        }
    }

    public playerDrawCard(): void {
        this.players.forEach(player => {
            const nextCard: Card = this.deck.draw();
            player.hand.push(nextCard);
        });
    }

    public getHandSize(): number {
        return this.players[0].hand.length;
    }

    public getDeck(): Deck {
        return this.deck;
    }

    public playersPlayCard(): void{
        this.players.forEach(player => {
            player.playFirstCard();
        });
    }

    public flipUpCards(): void {
        this.players.forEach(player => {
            player.flipUpCards();
        });
    }

    public countCardsInPlay(): number {
        return this.players[0].inPlay.length;
    }

    private getAllCards(): Card[] {
        const allCards: Card[] = [];
        this.players.forEach(player => {
            player.inPlay.forEach(card => {
                allCards.push(card);
            });
        });
        return allCards;
    }

    public countValue(value: number): number {
        const allCards = this.getAllCards();
        const cardsToCount = allCards.filter(card => card.value === value);
        return cardsToCount.length;
    }

    public countColor(color: Color): number {
        const allCards = this.getAllCards();
        const cardsToCount = allCards.filter(card => card.color === color);
        return cardsToCount.length;
    }

    public discardValue(value: number): void {
        this.players.forEach(player => {
            const toKeep = player.inPlay.filter(card => card.value !== value);
            player.inPlay = toKeep;
        });
    }

    public discardColor(color: Color): void {
        this.players.forEach(player => {
            const toKeep = player.inPlay.filter(card => card.color !== color);
            player.inPlay = toKeep;
        });
    }

    public hasMost(color: Color): boolean {
        const otherColors: Color[] = ALL_COLORS().filter(c => c !== color);
        const colorCount = this.countColor(color);
        for(let ix = 0; ix < otherColors.length; ix++){
            const otherColor = otherColors[ix];
            const otherColorCount = this.countColor(otherColor);
            if(otherColorCount >= colorCount){
                return false;
            }
        }
        return true;
    }

    public score(): void {
        this.players.forEach(player => {
            player.inPlay.forEach(card => {
                player.scorePile.push(card);
            });
            player.inPlay = [];
        });
    }

    public getScore(ix: number): number {
        return this.players[ix].getScore();
    }

    public toString(): string {
        const playerData = this.players.map(player => player.toString()).join("\n\n");

        return `Cards In Deck: ${this.deck.count()}

${playerData}`;
    }

}