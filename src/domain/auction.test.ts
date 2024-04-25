import { describe } from "node:test";
import { Auction } from "./auction";

afterEach(() => {
  jest.useRealTimers();
});

export const nowDate = new Date("2021-01-01T00:00:00.000Z");



describe("Auction", () => {
  test("初期化できる", () => {
    const obj = Auction.create(1, new Date(), new Date());
    expect(obj).toBeInstanceOf(Auction);
  });
  test("開始時刻が過去の場合は、オークションは作成できない", () => {
    expect(() => {
      Auction.create(1, new Date('2020-01-01T00:00:00.000Z'), new Date('2025-01-02T00:00:00.000Z'));
    }).toThrow("開始時刻が過去の日付です");
  });
  test("終了時刻が開始時刻より過去の場合は、オークションは作成できない", () => {
    expect(() => {
      Auction.create(1, new Date('2025-01-02T00:00:00.000Z'), new Date('2025-01-01T00:00:00.000Z'));
    }).toThrow("終了時刻が開始時刻より過去の日付です");
  });
  test("オークションを開始する", () => {
    const obj = Auction.create(1, new Date('2025-01-02T00:00:00.000Z'), new Date('2025-01-03T00:00:00.000Z'));
    obj.open(new Date('2025-01-02T00:00:00.001Z'))
    expect(obj.opend).toBe(true); 
  });
  test("開始時刻前にオークションを開始できない", () => {
    const obj = Auction.create(1, new Date('2025-01-02T00:00:00.000Z'), new Date('2025-01-03T00:00:00.000Z'));
    expect(() => {
    obj.open(new Date('2025-01-01T00:00:00.000Z'))
    }).toThrow("開始時刻前にオークションを開始できません");
  });
  test("オークションが開始していない場合は、入札できない", () => {
    const obj = Auction.create(1, new Date('2025-01-02T00:00:00.000Z'), new Date('2025-01-03T00:00:00.000Z'));
    expect(() => {
      //expect(obj.opend).toBe(false); 
      // obj.open(new Date('2025-01-02T00:00:00.001Z'))
      // expect(obj.opend).toBe(false); 
      obj.bid(1, 1000)
    }).toThrow("オークションが開始していない場合は、入札できません");
  });
  test("最高額にてオークションに入札する", () => {
    const obj = Auction.create(1, new Date('2025-01-02T00:00:00.000Z'), new Date('2025-01-03T00:00:00.000Z'));
    obj.open(new Date('2025-01-02T00:00:00.001Z'))
    obj.bid(1, 100)
    expect(obj.currentPrice).toBe(100);
  });
  test("最高額より少ない価格では入札できない", () => {
    const obj = Auction.create(1, new Date('2025-01-02T00:00:00.000Z'), new Date('2025-01-03T00:00:00.000Z'));
    obj.open(new Date('2025-01-02T00:00:00.001Z'))
    expect(() => {
      obj.bid(1, 1000)
      obj.bid(1, 1)
    }).toThrow("最高額より少ない価格では入札できない");
  });
  test("オークションを終了できる_落札者が存在する場合", () => {
    const obj = Auction.create(1, new Date('2025-01-02T00:00:00.000Z'), new Date('2025-01-03T00:00:00.000Z'));
    obj.open(new Date('2025-01-02T00:00:00.001Z'))
    obj.bid(1, 1)
    obj.end()
    expect(obj.buyerId).toBe(1);
  });
  test("オークションを終了できる_落札者が不在の場合", () => {
    const obj = Auction.create(1, new Date('2025-01-02T00:00:00.000Z'), new Date('2025-01-03T00:00:00.000Z'));
    obj.open(new Date('2025-01-02T00:00:00.001Z'))
    obj.end()
    expect(obj.buyerId).toBe(1);
  });
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
