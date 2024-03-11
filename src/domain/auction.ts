export class Auction {
  private status: "ready" | "started" | "ended" = "ready";
  constructor(
    readonly startAt: Date,
    readonly endAt: Date,
  ) {}

  static create(startAt: Date, endAt: Date): Auction {
    const now = new Date();
    console.log("created: ", now);
    if (startAt < now) {
      throw new Error("開始時刻が過去です");
    }
    if (startAt > endAt) {
      throw new Error("終了時刻が開始時刻より過去です");
    }
    return new Auction(startAt, endAt);
  }

  start(): void {
    const now = new Date();
    console.log("started: ", now);
    if (this.startAt > now) {
      throw new Error("開始時刻前の為、オークションが開始出来ません");
    }
    this.status = "started";
  }

  isStarted(): boolean {
    return this.status === "started";
  }

  bid(_price: number): void {
    if (this.status !== "started") {
      throw new Error("オークションが開始していない場合は、入札できません");
    }
  }
}
