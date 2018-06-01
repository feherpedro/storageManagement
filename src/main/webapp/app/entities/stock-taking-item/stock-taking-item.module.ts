import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StorageManagementSharedModule } from '../../shared';
import {
    StockTakingItemService,
    StockTakingItemPopupService,
    StockTakingItemComponent,
    StockTakingItemDetailComponent,
    StockTakingItemDialogComponent,
    StockTakingItemPopupComponent,
    StockTakingItemDeletePopupComponent,
    StockTakingItemDeleteDialogComponent,
    stockTakingItemRoute,
    stockTakingItemPopupRoute,
    StockTakingItemResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stockTakingItemRoute,
    ...stockTakingItemPopupRoute,
];

@NgModule({
    imports: [
        StorageManagementSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StockTakingItemComponent,
        StockTakingItemDetailComponent,
        StockTakingItemDialogComponent,
        StockTakingItemDeleteDialogComponent,
        StockTakingItemPopupComponent,
        StockTakingItemDeletePopupComponent,
    ],
    entryComponents: [
        StockTakingItemComponent,
        StockTakingItemDialogComponent,
        StockTakingItemPopupComponent,
        StockTakingItemDeleteDialogComponent,
        StockTakingItemDeletePopupComponent,
    ],
    providers: [
        StockTakingItemService,
        StockTakingItemPopupService,
        StockTakingItemResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StorageManagementStockTakingItemModule {}
