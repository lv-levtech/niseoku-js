class Auction {

    private constructor(
        readonly id: number,
        readonly startTime: Date,
    ){}

    static create(id: number, startTime: Date): Auction {
        if (date() > startTime) {
            throw new Error("開始時刻が過去の日付です")
        }

        return new Auction(id, startTime);
    }

    get date(): Date {
        const nowDate = new Date();
        return nowDate;
    }
      
}
export { Auction };