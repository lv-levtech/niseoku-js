const nowDate = new Date();

class Auction {

    public opend: boolean = false;
    private bidderId?: number;
    private currentPrice: number = 0;


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
        this.bidderId = bidderId;
        this.currentPrice = price;
    }

    get currentPrice(): number{
        return this.currentPrice;
    }

    
      
}
export { Auction };