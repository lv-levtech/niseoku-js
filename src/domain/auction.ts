const nowDate = new Date();

class Auction {

    private constructor(
        readonly id: number,
        readonly startTime: Date,
        readonly endTime: Date,
    ){}

    static create(id: number, startTime: Date, endTime: Date): Auction {
        if (nowDate > startTime) {
            throw new Error("開始時刻が過去の日付です")
        }
        if (startTime > endTime) {
            throw new Error("終了時刻が開始時刻より過去の日付です")
        }
        return new Auction(id, startTime, endTime);
    }
      
}
export { Auction };