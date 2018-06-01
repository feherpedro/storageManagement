import { BaseEntity } from './../../shared';

export class StockTaking implements BaseEntity {
    constructor(
        public id?: number,
        public stockTakingDate?: any,
        public statusId?: number,
    ) {
    }
}
