import { describe } from "node:test";
import { Auction } from "./auction";

beforeEach(() => {
  const now = new Date("2026-01-01T00:00:00Z");
  jest.useFakeTimers().setSystemTime(now.getTime());
});
afterEach(() => {
  jest.useRealTimers();
});

describe("Auction", () => {
  test("初期化できる", () => {
    const startAt = new Date("2027-01-01T00:00:00Z");
    const endAt = new Date("2027-12-31T23:59:59Z");

    const auction = Auction.create(startAt, endAt);
    expect(auction).toBeInstanceOf(Auction);
  });
  test("開始時刻が過去の場合は、オークションは作成できない", () => {
    const startAt = new Date("2025-12-31T23:59:59Z");
    const endAt = new Date("2026-12-31T23:59:59Z");

    expect(() => {
      Auction.create(startAt, endAt);
    }).toThrow("開始時刻が過去です");
  });
  test("終了時刻が開始時刻より過去の場合は、オークションは作成できない", () => {
    const startAt = new Date("2027-01-01T00:00:00Z");
    const endAt = new Date("2026-12-31T23:59:59Z");
    expect(() => {
      Auction.create(startAt, endAt);
    }).toThrow("終了時刻が開始時刻より過去です");
  });
  test("オークションを開始する", () => {
    const startAt = new Date("2027-01-01T00:00:00Z");
    const endAt = new Date("2027-12-31T23:59:59Z");

    const auction = Auction.create(startAt, endAt);
    const now = new Date("2027-01-01T00:00:01Z");
    jest.useFakeTimers().setSystemTime(now.getTime());
    auction.start();
    expect(auction.isStarted()).toBe(true);
  });
  test("開始時刻前にオークションを開始できない", () => {
    const startAt = new Date("2026-01-01T00:00:01Z");
    const endAt = new Date("2027-12-31T23:59:59Z");

    const auction = Auction.create(startAt, endAt);

    expect(() => {
      auction.start();
    }).toThrow("開始時刻前の為、オークションが開始出来ません");
  });
  test("オークションが開始していない場合は、入札できない", () => {
    const startAt = new Date("2026-01-01T00:00:01Z");
    const endAt = new Date("2027-12-31T23:59:59Z");

    const auction = Auction.create(startAt, endAt);

    expect(() => {
      auction.bid(100);
    }).toThrow("オークションが開始していない場合は、入札できません");
  });
  test("最高額にてオークションに入札する", () => {
    const startAt = new Date("2026-01-01T00:00:01Z");
    const endAt = new Date("2027-12-31T23:59:59Z");

    const auction = Auction.create(startAt, endAt);
    const now = new Date("2027-01-01T00:00:01Z");
    jest.useFakeTimers().setSystemTime(now.getTime());
    auction.start();
    auction.bid(100);

    expect(auction.bidPrice).toBe(100);
  });
  test("最高額より少ない価格では入札できない", () => {
    const startAt = new Date("2026-01-01T00:00:01Z");
    const endAt = new Date("2027-12-31T23:59:59Z");

    const auction = Auction.create(startAt, endAt);
    const now = new Date("2027-01-01T00:00:01Z");
    jest.useFakeTimers().setSystemTime(now.getTime());
    auction.start();
    auction.bid(101);

    expect(() => {
      auction.bid(100);
    }).toThrow("最高額より少ない価格では入札できません");
  });
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
