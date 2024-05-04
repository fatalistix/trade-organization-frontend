export class Money {
    private _rubles: number = 0
    private _pennies: number = 0

    public constructor(rubles: number, pennies: number) {
        this.validateRubles(rubles)
        this.validatePennies(pennies)
        this._rubles = rubles
        this._pennies = pennies
    }

    public get rubles(): number {
        return this._rubles
    }

    public get pennies(): number {
        return this._pennies
    }

    public set rubles(rubles: number) {
        this.validateRubles(rubles)
        this._rubles = rubles
    }

    public set pennies(pennies: number) {
        this.validatePennies(pennies)
        this._pennies = pennies
    }

    private validateRubles(rubles: number) {
        if (rubles < 0) {
            throw new Error("Invalid rubles value")
        }
    }

    private validatePennies(pennies: number) {
        if (pennies < 0 || 99 < pennies) {
            throw new Error("Invalid pennies value")
        }
    }
}