import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StorageManagementSharedModule } from '../../shared';
import {
    StockTakingService,
    StockTakingPopupService,
    StockTakingComponent,
    StockTakingDetailComponent,
    StockTakingDialogComponent,
    StockTakingPopupComponent,
    StockTakingDeletePopupComponent,
    StockTakingDeleteDialogComponent,
    stockTakingRoute,
    stockTakingPopupRoute,
    StockTakingResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stockTakingRoute,
    ...stockTakingPopupRoute,
];

@NgModule({
    imports: [
        StorageManagementSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StockTakingComponent,
        StockTakingDetailComponent,
        StockTakingDialogComponent,
        StockTakingDeleteDialogComponent,
        StockTakingPopupComponent,
        StockTakingDeletePopupComponent,
    ],
    entryComponents: [
        StockTakingComponent,
        StockTakingDialogComponent,
        StockTakingPopupComponent,
        StockTakingDeleteDialogComponent,
        StockTakingDeletePopupComponent,
    ],
    providers: [
        StockTakingService,
        StockTakingPopupService,
        StockTakingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StorageManagementStockTakingModule {}
