
export class Auction {
  constructor(
    readonly started_at: Date,
  ) {
    if (new Date() > started_at) {
      throw new Error("開始時刻が過去です");
    }
  }
}
