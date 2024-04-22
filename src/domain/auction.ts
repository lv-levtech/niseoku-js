class Auction {

    private constructor(
        readonly id: number,
        readonly startTime: Date,
    ){}

    static create(id: number, startTime: Date): Auction {
        return new Auction(id);
    }
      
}
export { Auction };