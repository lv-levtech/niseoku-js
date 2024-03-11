export class Auction {
  private status: "ready" | "started" | "ended" = "ready";
  private _bidPrice: number = 0;
  public get bidPrice(): number {
    return this._bidPrice;
  }
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
    if (price <= this._bidPrice) {
      throw new Error("最高額より少ない価格では入札できません");
    }

    this._bidPrice = price;
  }
}
