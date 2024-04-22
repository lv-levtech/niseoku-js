import { describe } from "node:test";


class Auction {
  public readonly id: number;
  public readonly startTime: Date;
  public readonly endTime: Date;
  constructor(id: number, startTime: Date, endTime: Date) {
    if (startTime < new Date()) {
      throw new Error("開始時刻が過去です");
    }
    if (endTime < startTime) {
      throw new Error("終了時刻が開始時刻よりも過去です");
    }
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

afterEach(() => {
  jest.useRealTimers();
});

describe("Auction", () => {
  test("初期化できる", () => {
    const feature = new Date();
    expect(new Auction(1, new Date(), feature)).toBeInstanceOf(Auction);
  });
  test("開始時刻が過去の場合は、オークションは作成できない", () => {
    const past = new Date();
    past.setFullYear(past.getFullYear() - 1);
    const feature = new Date();
    expect(() => {
      new Auction(1, past, feature);
    }).toThrow("開始時刻が過去です");
  });
  test("終了時刻が開始時刻より過去の場合は、オークションは作成できない", () => {
    const past = new Date();
    past.setFullYear(past.getFullYear() - 1);
    const feature = new Date();
    feature.setFullYear(feature.getFullYear() - 3);
    expect(() => {
      new Auction(1, past, feature);
    }).toThrow("終了時刻が開始時刻よりも過去です");
  });
  test("オークションを開始する", () => {
    fail();
  });
  test("開始時刻前にオークションを開始できない", () => {
    fail();
  });
  test("オークションが開始していない場合は、入札できない", () => {
    fail();
  });
  test("最高額にてオークションに入札する", () => {
    fail();
  });
  test("最高額より少ない価格では入札できない", () => {
    fail();
  });
  test("オークションを終了できる_落札者が存在する場合", () => {
    fail();
  });
  test("オークションを終了できる_落札者が不在の場合", () => {
    fail();
  });
  test("出品者の販売価格を取得する_2パーセントの手数料を引く", () => {
    fail();
  });
  test("落札者の購入価格を取得する_一般商品には10ドルの配送料を追加する", () => {
    fail();
  });
  test("落札者の購入価格を取得する_ダウンロードソフトウェア", () => {
    fail();
  });
  test("落札者の購入価格を取得する_自動車(1000ドルの送料が追加)", () => {
    fail();
  });
  test("落札者の購入価格を取得する_5万ドル以上の自動車(4%の贅沢税追加)", () => {
    fail();
  });
});
