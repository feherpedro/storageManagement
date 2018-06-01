import { BaseEntity } from './../../shared';

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public price?: number,
        public quantity?: number,
        public unitOfMeasurement?: string,
        public barcode?: string,
        public productCategoryId?: number,
        public priceCategoryId?: number,
        public statusId?: number,
    ) {
    }
}
