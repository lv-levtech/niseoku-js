export class Auction {
  private status: "ready" | "started" | "ended" = "ready";
    private bidPrice: number = 0;
  constructor(
    readonly startAt: Date,
    readonly endAt: Date,
  ) {}

  static create(startAt: Date, endAt: Date): Auction {
    const now = new Date();
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
    if (this.startAt > now) {
      throw new Error("開始時刻前の為、オークションが開始出来ません");
    }
    this.status = "started";
  }

  isStarted(): boolean {
    return this.status === "started";
  }

  bid(price: number): void {
    if (this.status !== "started") {
      throw new Error("オークションが開始していない場合は、入札できません");
    }

    this.bidPrice = price;
  }
}
