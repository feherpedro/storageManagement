import { BaseEntity } from './../../shared';

export class OrderEntity implements BaseEntity {
    constructor(
        public id?: number,
        public createDate?: any,
        public paymentDate?: any,
        public dueDate?: any,
        public statusId?: number,
    ) {
    }
}
