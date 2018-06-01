import { BaseEntity } from './../../shared';

export class StockTakingItem implements BaseEntity {
    constructor(
        public id?: number,
        public oldQuantity?: number,
        public newQuantity?: number,
        public difference?: number,
        public stockTakingId?: number,
        public productId?: number,
        public statusId?: number,
    ) {
    }
}
