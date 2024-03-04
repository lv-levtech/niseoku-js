import { describe } from "node:test";

afterEach(() => {
  jest.useRealTimers();
});

class Auction {
  constructor(readonly id: string, readonly startDateTime: Date,readonly endDateTime: Date, readonly isStarted: boolean = false){
    if(startDateTime < new Date()){
      throw new Error("開始時刻が過去です");
    }
    if(endDateTime < startDateTime){
      throw new Error("終了時刻が開始時刻より過去です");
    }
  }

  start(now: Date): Auction {
    if(this.startDateTime > now){
      throw new Error("開始時刻前にオークションを開始できない");
    }
    return new Auction(this.id, this.startDateTime, this.endDateTime, true);
  }
}

describe("Auction", () => {
  test("初期化できる", () => {
    const auction = new Auction("1", new Date(), new Date());
    expect(auction.id).toBe("1")
  });

  test("開始時刻が過去の場合は、オークションは作成できない", () => {
    const past = new Date();
    past.setHours(past.getHours() - 1);
    expect(() => new Auction("1", past,new Date())).toThrow("開始時刻が過去です");
  });
  test("終了時刻が開始時刻より過去の場合は、オークションは作成できない", () => {
    const startDate = new Date();
    startDate.setHours(startDate.getHours() + 1);
    const endDate = new Date();
    endDate.setHours(endDate.getHours() - 1);
    expect(() => new Auction("1", startDate, endDate)).toThrow("終了時刻が開始時刻より過去です");
  });
  test("オークションを開始する", () => {
    const startDate = new Date();
    startDate.setHours(startDate.getHours() + 1);
    const endDate = new Date();
    endDate.setHours(endDate.getHours() + 3);
    const auction = new Auction("1", startDate, endDate);

    const now = new Date();
    now.setHours(now.getHours() + 2);
    const startedAction = auction.start(now);
    expect(startedAction.isStarted).toBe(true);
  });
  test("開始時刻前にオークションを開始できない", () => {
    const startDate = new Date();
    startDate.setHours(startDate.getHours() + 2);
    const endDate = new Date();
    endDate.setHours(endDate.getHours() + 3);
    const auction = new Auction("1", startDate, endDate);

    const now = new Date();
    now.setHours(now.getHours() + 1);

    expect(() => auction.start(now)).toThrow("開始時刻前にオークションを開始できない");
  });
  // test("オークションが開始していない場合は、入札できない", () => {
  //   fail();
  // });
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
