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
    const auction = new Auction(new Date("2024-04-22"),new Date("2024-04-23"), true);
    expect(auction).toBeDefined();
  });
  test("開始時刻が過去の場合は、オークションは作成できない", () => {
    expect(()=>{new Auction(new Date("2022-12-31"),new Date("2024-04-23"), true)}).toThrow();
  });
  test("終了時刻が開始時刻より過去の場合は、オークションは作成できない", () => {
    expect(()=>{new Auction(new Date("2024-04-31"),new Date("2022-12-30"), true)}).toThrow();
  });
  test("オークションを開始する", () => {
    // TODO 今から始めます！の時間を第3引数に入れて、第1引数のオークション開始時間と比較して過去の場合はエラーを出すことを想定するテストを書こうとして時間切れした
    const auction = new Auction(new Date("2024-04-22"),new Date("2024-04-23"), new Date("2024-04-23"));
    expect(auction.isStarted).toBe(true);
  });
  // test("開始時刻前にオークションを開始できない", () => {
  //   fail();
  // });
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
