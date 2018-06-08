import { BaseEntity } from './../../shared';
import {OrderItem} from '../order-item/order-item.model';

export class OrderEntity implements BaseEntity {
    constructor(
        public id?: number,
        public createDate?: any,
        public paymentDate?: any,
        public dueDate?: any,
        public statusId?: number,
        public statusName?: string,
        public orderItemList?: OrderItem[]
    ) {
        this.orderItemList = [];
    }
}
