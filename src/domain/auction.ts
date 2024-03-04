export class Auction {
    constructor(
        readonly startAt: Date,
    ) {
    }

    static of(startAt: Date): Auction {
        if (startAt < new Date()) {
            throw new Error("開始時刻が過去です");
        }
        return new Auction(startAt);
    }
}