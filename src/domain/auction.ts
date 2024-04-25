const nowDate = new Date();

class Auction {

    public opend: boolean = false;
    private _bidderId?: number;
    private _currentPrice: number = 0;


    private constructor(
        readonly id: number,
        readonly startTime: Date,
        readonly endTime: Date,
        readonly startPrice: number = 0
    ){}

    static create(id: number, startTime: Date, endTime: Date): Auction {
        if (nowDate > startTime) {
            throw new Error("開始時刻が過去の日付です")
        }
        if (startTime > endTime) {
            throw new Error("終了時刻が開始時刻より過去の日付です")
        }
        return new Auction(id, startTime, endTime);
    }

    open(openTime: Date) {
        if (openTime < this.startTime) {
            throw new Error("開始時刻前にオークションを開始できません")
        }
        this.opend = true
    }

    bid(bidderId: number, price: number){
        if(!this.opend){
            throw new Error("オークションが開始していない場合は、入札できません")
        }
        if(price <= this._currentPrice){
            throw new Error("最高額より少ない価格では入札できない")
        }
        this._bidderId = bidderId;
        this._currentPrice = price;
    }

    end()

    get currentPrice(): number{
        return this._currentPrice;
    }

    get bidderId(): number | undefined{
        return this._bidderId;
    }
      
}
export { Auction };