import { BaseEntity } from './../../shared';

export class OrderItem implements BaseEntity {
    constructor(
        public id?: number,
        public quantity?: number,
        public orderEntityId?: number,
        public productId?: number,
        public productName?: string,
        public productUnitOfMeasurement?: string,
        public statusId?: number,
        public statusName?: string,
    ) {
    }
}
