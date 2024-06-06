import { Try } from "ts-try"

export class Money {
    private readonly _rubles: number = 0
    private readonly _pennies: number = 0

    private constructor(rubles: number, pennies: number) {
        this._rubles = rubles
        this._pennies = pennies
    }

    public static from(rubles: number, pennies: number): Try<Money> {
        if (!this.areValidRubles(rubles)) {
            return new Error("rubles must be >= 0")
        }
        if (!this.areValidPennies(pennies)) {
            return new Error("pennies must be >= 0 and <= 99")
        }
        return new Money(rubles, pennies)
    }

    public static fromString(s: string): Try<Money> {
        const value = +s
        const rubles = Math.trunc(value)
        const pennies = Math.round((value - rubles) * 100)
        return this.from(rubles, pennies)
    }

    public get rubles(): number {
        return this._rubles
    }

    public get pennies(): number {
        return this._pennies
    }

    private static areValidRubles(rubles: number): boolean {
        if (rubles < 0) {
            return false
        }
        return true
    }

    private static areValidPennies(pennies: number) {
        if (pennies < 0 || 99 < pennies) {
            return false
        }
        return true
    }

    public toString(): string {
        return `${this._rubles}.${this._pennies}`
    }
}