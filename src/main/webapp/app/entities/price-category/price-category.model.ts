import { BaseEntity } from './../../shared';

export class PriceCategory implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public price?: number,
    ) {
    }
}
