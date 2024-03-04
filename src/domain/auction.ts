export class Auction {
  constructor(
    readonly startAt: Date,
    readonly endAt: Date,
  ) {}

  static of(startAt: Date): Auction {
    if (startAt < new Date()) {
      throw new Error("開始時刻が過去です");
    }
    if (startAt > endAt) {
      throw new Error("終了時刻が開始時刻より過去です");
    }
    return new Auction(startAt);
  }
}
