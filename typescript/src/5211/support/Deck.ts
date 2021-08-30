export class Card {

    public readonly color: Color;
    public readonly value: number;
    private _isFaceUp: boolean;

    public constructor(color: Color, value: number) {
        if (color === undefined || color === null) {
            throw new Error(`Invalid color: ${color}`);
        }
        if (value === undefined || value == null || value < 1 || value > 6) {
            throw new Error(`Invalid value: ${value}`);
        }
        this.color = color;
        this.value = value;
        this._isFaceUp = false;
    }

    public setFaceUp(isFaceUp: boolean): void {
        this._isFaceUp = isFaceUp;
    }

    public isFaceUp(): boolean {
        return this._isFaceUp;
    }

    public toString(): string {
        return this.color + "-" + this.value;
    }
}

export class Deck {

    private deck: Card[];

    public constructor() {
        this.deck = [];
        ALL_COLORS().forEach(color => {
            // Add 5 ones
            this.addCards(color, 1, 5);
            // Add 6 twos
            this.addCards(color, 2, 6);
            // Add 5 threes
            this.addCards(color, 3, 5);
            // Add 2 fours
            this.addCards(color, 4, 2);
            // Add 1 five
            this.addCards(color, 5, 1);
            // Add 1 six
            this.addCards(color, 6, 1);
        });
        this.shuffle();
    }

    private addCards(color: Color, value: number, amount: number): void {
        for (let i = 0; i < amount; i++) {
            this.deck.push(new Card(color, value));
        }
    }

    public shuffle() {
        var currentIndex = this.deck.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [this.deck[currentIndex], this.deck[randomIndex]] = [
                this.deck[randomIndex], this.deck[currentIndex]];
        }
    }

    public discard(amount: number): void {
        this.deck.splice(0, amount);
    }

    public isEmpty(): boolean {
        return this.deck.length == 0;
    }

    public draw(): Card {
        return this.deck.shift() as Card;
    }

    public count(): number {
        return this.deck.length;
    }
}

export enum Color {
    RED = "Red",
    ORANGE = "Orange",
    GREEN = "Green",
    BLUE = "Blue",
    YELLOW = "Yellow"
}

export const ALL_COLORS: () => Color[] = () => [Color.RED, Color.ORANGE, Color.GREEN, Color.BLUE, Color.YELLOW];