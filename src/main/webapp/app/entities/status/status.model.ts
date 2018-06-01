import { BaseEntity } from './../../shared';

export class Status implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
    ) {
    }
}
