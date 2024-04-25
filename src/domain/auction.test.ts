import { describe } from "node:test";


class Auction {
  private constructor(readonly id: number, readonly startTime: Date, readonly endTime: Date, readonly isStarted: boolean = false, readonly startPrice: number = 0, readonly currentPrice: number = 0) {
    if (startTime < new Date()) {
      throw new Error("開始時刻が過去です");
    }
    if (endTime < startTime) {
      throw new Error("終了時刻が開始時刻よりも過去です");
    }
  }

  start(now: Date) {
   if (this.startTime > now) {
      throw new Error("入札が開始できないよぉ");
   }
    return new Auction(this.id, this.startTime, this.endTime, true);
  }

  bid(price: number) {
    if (!this.isStarted) {
      throw new Error("入札できないよ");
    }
    return new Auction(this.id, this.startTime, this.endTime, this.isStarted, this.startPrice, price);
  }

  static create(id: number, startTime: Date, endTime: Date): Auction {
    return new Auction(id, startTime, endTime);
  }

}

afterEach(() => {
  jest.useRealTimers();
});

describe("Auction", () => {
  test("初期化できる", () => {
    const endTime = new Date();
    expect(Auction.create(1, new Date(), endTime)).toBeInstanceOf(Auction);
  });
  test("開始時刻が過去の場合は、オークションは作成できない", () => {
    const startTime = new Date();
    startTime.setFullYear(startTime.getFullYear() - 1);
    const endTime = new Date(startTime)
    expect(() => {
      Auction.create(1, startTime, endTime);
    }).toThrow("開始時刻が過去です");
  });
  test("終了時刻が開始時刻より過去の場合は、オークションは作成できない", () => {
    const startTime = new Date();
    startTime.setFullYear(startTime.getFullYear() + 10);
    const endTime = new Date(startTime)
    endTime.setFullYear(endTime.getFullYear() - 1);
    expect(() => {
      Auction.create(1, startTime, endTime);
    }).toThrow("終了時刻が開始時刻よりも過去です");
  });
  test("オークションを開始する", () => {
    const startTime = new Date();
    startTime.setFullYear(startTime.getFullYear() + 1);

    const endTime = new Date(startTime)
    endTime.setFullYear(endTime.getFullYear() + 1);

    const mockNow = new Date(startTime);
    mockNow.setFullYear(mockNow.getFullYear() + 1);

    const auction = Auction.create(1, startTime, endTime);
    const startedAuction = auction.start(mockNow);
    expect(startedAuction.isStarted).toBe(true);
  });
  test("開始時刻前にオークションを開始できない", () => {
    const now = new Date();
    const startTime = new Date(now);
    startTime.setFullYear(startTime.getFullYear() + 1);
    const endTime = new Date(startTime)
    endTime.setFullYear(endTime.getFullYear() + 2);
    const auction = Auction.create(1, startTime, endTime);
    expect(() => { 
      auction.start(now);
      
    }).toThrow("入札が開始できないよぉ");
  });
  test("オークションが開始していない場合は、入札できない", () => {
    const startTime = new Date();
    startTime.setFullYear(startTime.getFullYear() + 1);

    const endTime = new Date(startTime)
    endTime.setFullYear(endTime.getFullYear() + 1);

    const mockNow = new Date(startTime);
    mockNow.setFullYear(mockNow.getFullYear() + 1);

    const auction = Auction.create(1, startTime, endTime);
    expect(() => {
      auction.bid(1000);
    }).toThrow("入札できないよ");
  });
  // test("最高額にてオークションに入札する", () => {
  //   fail();
  // });
  // test("最高額より少ない価格では入札できない", () => {
  //   fail();
  // });
  // test("オークションを終了できる_落札者が存在する場合", () => {
  //   fail();
  // });
  // test("オークションを終了できる_落札者が不在の場合", () => {
  //   fail();
  // });
  // test("出品者の販売価格を取得する_2パーセントの手数料を引く", () => {
  //   fail();
  // });
  // test("落札者の購入価格を取得する_一般商品には10ドルの配送料を追加する", () => {
  //   fail();
  // });
  // test("落札者の購入価格を取得する_ダウンロードソフトウェア", () => {
  //   fail();
  // });
  // test("落札者の購入価格を取得する_自動車(1000ドルの送料が追加)", () => {
  //   fail();
  // });
  // test("落札者の購入価格を取得する_5万ドル以上の自動車(4%の贅沢税追加)", () => {
  //   fail();
  // });
});
