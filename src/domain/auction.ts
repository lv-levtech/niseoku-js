
export class Auction {
  // TODO: 列挙型にする
  private _status: string = "created";

  constructor(
    readonly started_at: Date,
    readonly end_at: Date
  ) {
    if (new Date() > started_at) {
      throw new Error("開始時刻が過去です");
    }
    if(end_at < started_at){
      throw new Error("終了時刻が開始時刻より過去です");
    }
  }

  start() {
    this._status = "started";
  }

  get status() {
    return this._status;
  }
}
