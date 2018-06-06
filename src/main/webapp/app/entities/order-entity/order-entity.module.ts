import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StorageManagementSharedModule } from '../../shared';
import {
    OrderEntityService,
    OrderEntityPopupService,
    OrderEntityComponent,
    OrderEntityDetailComponent,
    OrderEntityDialogComponent,
    OrderEntityPopupComponent,
    OrderEntityDeletePopupComponent,
    OrderEntityDeleteDialogComponent,
    orderEntityRoute,
    orderEntityPopupRoute,
    OrderEntityResolvePagingParams,
} from './';
import {StorageManagementOrderItemModule} from '../order-item/order-item.module';

const ENTITY_STATES = [
    ...orderEntityRoute,
    ...orderEntityPopupRoute,
];

@NgModule({
    imports: [
        StorageManagementSharedModule,
        StorageManagementOrderItemModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrderEntityComponent,
        OrderEntityDetailComponent,
        OrderEntityDialogComponent,
        OrderEntityDeleteDialogComponent,
        OrderEntityPopupComponent,
        OrderEntityDeletePopupComponent,
    ],
    entryComponents: [
        OrderEntityComponent,
        OrderEntityDialogComponent,
        OrderEntityPopupComponent,
        OrderEntityDeleteDialogComponent,
        OrderEntityDeletePopupComponent,
    ],
    providers: [
        OrderEntityService,
        OrderEntityPopupService,
        OrderEntityResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StorageManagementOrderEntityModule {}
