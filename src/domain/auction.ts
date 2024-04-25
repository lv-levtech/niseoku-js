
export class Auction {
  // TODO: 列挙型にする
  private _status: string = "created";

  constructor(
    readonly started_at: Date,
    readonly end_at: Date
  ) {
    const now = new Date();
    // console.log("created", now, started_at, now > started_at);
    if (now > started_at) {
      throw new Error("開始時刻が過去です");
    }
    if(end_at < started_at){
      throw new Error("終了時刻が開始時刻より過去です");
    }
  }

  start() {
    const now = new Date();
    // console.log("started", now, this.started_at, now < this.started_at);
    if (now < this.started_at) {
      throw new Error("開始時刻前にオークションを開始できません");
    }
    this._status = "started";
  }

  get status() {
    return this._status;
  }

  bid() {
    if (this._status !== "started") {
      throw new Error("オークションが開始していません");
    }
  }
}
