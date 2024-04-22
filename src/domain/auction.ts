
export class Auction {
  constructor(
    readonly started_at: Date,
    readonly end_at: Date,
    readonly isStarted: boolean
  ) {
    if (new Date() > started_at) {
      throw new Error("開始時刻が過去です");
    }
    if(end_at < started_at){
      throw new Error("終了時刻が開始時刻より過去です");
    }
  }
}
