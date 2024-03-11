import { describe } from "node:test";
import { Money } from "./money";
// import { DateUtil } from "./../util/dateUtil";

// class DateUtilMock implements DateUtil {
//   constructor() {
    
//     getCurrentDate(): Date {
//       return new Date("2020-01-01 12:00:00");
//     }
//   }
// }

class Auction {
  readonly id: number;
  isStarted: boolean;
  startAt: Date | undefined;
  // private endAt: Date | undefined;
  // sallerId: number;
  // productDetail: string;

  private constructor(startAt: Date) {
    // const dateUtil = new DateUtilMock();
    this.id = 1;
    this.isStarted = false;
    this.startAt = startAt;
  }

  static create(param: {
    startAt: Date,
    endAt: Date
  }): Auction {
    if (Date.now() > param.startAt.getTime()) {
      throw new Error("開始時刻が過去のため、オークションを作成できません");
    }
    if (param.startAt.getTime() > param.endAt.getTime()) {
      throw new Error("終了時刻が開始時刻より過去のため、オークションを作成できません");
    }
    // this.startAt = param.startAt;
    // this.endAt = param.endAt;
    return new Auction(param.startAt);
  }

  start(localTime: Date) {
    if (localTime.getTime() < this.startAt!.getTime()) {
      throw new Error("開始時刻前のため、オークションを開始できません");
    }
    this.isStarted = true;
  }

  bid(money: Money) {
    if (!this.isStarted) {
      throw new Error("オークションが開始していないため、入札できません");
    }
    console.log(money)
  }
}

afterEach(() => {
  jest.useRealTimers();
});

describe("Auction", () => {
  test("初期化できる", () => {
    const createdAuction = Auction.create({ startAt: new Date("2030-01-01 12:00:00"), endAt: new Date("2031-01-01 11:00:00")});

    const expected = 1;
    expect(createdAuction.id).toBe(expected);
  });
  test("開始時刻が過去の場合は、オークションは作成できない", () => {
    expect(() => {
      Auction.create({
        startAt: new Date("2020-01-01 12:00:00"),
        endAt: new Date("2021-01-01 11:00:00")
      });
    }).toThrow();
  });
  test("終了時刻が開始時刻より過去の場合は、オークションは作成できない", () => {
    expect(() => {
      Auction.create({
        startAt: new Date("2021-01-01 12:00:00"),
        endAt: new Date("2021-01-01 11:00:00")
      });
    }).toThrow();
  });
  test("オークションを開始する", () => {
    const auction = Auction.create({
      startAt: new Date("2024-03-21 12:00:00"),
      endAt: new Date("2031-01-01 11:00:00")
    });
    auction.start(new Date("2024-03-21 12:01:00"));
    expect(() => {
      auction.isStarted;
    }).toBeTruthy();
  });
  test("開始時刻前にオークションを開始できない", () => {
    const auction = Auction.create({
      startAt: new Date("2030-01-01 12:00:00"),
      endAt: new Date("2031-01-01 11:00:00")
    });
    
    expect(() => {
      auction.start(new Date("2024-03-21 11:00:00"));
    }).toThrow();
  });
  test("オークションが開始していない場合は、入札できない", () => {
    const auction = Auction.create({
      startAt: new Date("2030-01-01 12:00:00"),
      endAt: new Date("2031-01-01 11:00:00")
    });
    expect(() => {
      const money = Money.ofJPY(1000);
      auction.bid(money)
    }).toThrow();
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
