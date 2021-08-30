import { Card } from "./deck";

export class Player {

    private static ID: number = 1;

    public id: number = Player.ID++;
    public hand: Card[] = [];
    public inPlay: Card[] = [];
    public scorePile: Card[] = [];

    public flipUpCards(): void {
        this.inPlay.forEach(card => {
            card.setFaceUp(true);
        });
    }

    public getScore(): number {
        let score = 0;
        this.scorePile.forEach(card => {
            score += card.value;
        });
        return score;
    }

    public playFirstCard(): void {
        const cardToPlay: Card = this.hand.shift() as Card;
        this.inPlay.push(cardToPlay);
    }

    public playCard(ix: number) {
        const cardToPlay: Card = this.hand[ix];
        this.hand.splice(ix, 1);
        this.inPlay.push(cardToPlay);
    }

    public prettyCards(cards: Card[]): string {
        return cards.map(card => card.toString()).join(", ");
    }

    public toString(): string {
        return `Player ${this.id}:
  Hand: ${this.prettyCards(this.hand)}
  In Play: ${this.prettyCards(this.inPlay)}
  Score: ${this.getScore()}`;
    }

}