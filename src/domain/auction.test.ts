import { describe } from "node:test";
import { Auction } from "./auction";

beforeEach(() => {
  jest.useFakeTimers();
  const mockDate = new Date("2023/01/01");
  jest.setSystemTime(mockDate);
});

afterEach(() => {
  jest.useRealTimers();
});

describe("Auction", () => {
  test("初期化できる", () => {
    const auction = new Auction(new Date("2024-04-22"),new Date("2024-04-23"));
    expect(auction).toBeDefined();
  });
  test("開始時刻が過去の場合は、オークションは作成できない", () => {
    expect(()=>{new Auction(new Date("2022-12-31"),new Date("2024-04-23"))}).toThrow();
  });
  test("終了時刻が開始時刻より過去の場合は、オークションは作成できない", () => {
    expect(()=>{new Auction(new Date("2024-04-31"),new Date("2022-12-30"))}).toThrow();
  });
  test("オークションを開始する", () => {
    const auction = new Auction(new Date("2024-05-01"),new Date("2024-05-23"));

    // オークションを開始するために時刻を進める
    jest.useFakeTimers();
    const mockDate = new Date("2024/05/02");
    jest.setSystemTime(mockDate);

    auction.start();
    expect(auction.status).toBe("started");
  });
  test("開始時刻前にオークションを開始できない", () => {
    const auction = new Auction(new Date("2024-04-22"),new Date("2024-04-23"));
    expect(auction.start).toThrow();
  });
  test("オークションが開始していない場合は、入札できない", () => {
    const auction = new Auction(new Date("2024-04-22"),new Date("2024-04-23"));
    expect(auction.status).not.toBe("started");
    expect(auction.bid).toThrow();
  });
  test("最高額にてオークションに入札する", () => {
    const auction = new Auction(new Date("2024-04-22"),new Date("2024-04-23"));
    // オークションを開始するために時刻を進める
    jest.useFakeTimers();
    const mockDate = new Date("2024/04/23");
    jest.setSystemTime(mockDate);
    auction.start();
    auction.bid(100);
    expect(auction.highestBid).toBe(100);
  });
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
