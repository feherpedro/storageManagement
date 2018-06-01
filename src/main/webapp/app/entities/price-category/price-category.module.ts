import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StorageManagementSharedModule } from '../../shared';
import {
    PriceCategoryService,
    PriceCategoryPopupService,
    PriceCategoryComponent,
    PriceCategoryDetailComponent,
    PriceCategoryDialogComponent,
    PriceCategoryPopupComponent,
    PriceCategoryDeletePopupComponent,
    PriceCategoryDeleteDialogComponent,
    priceCategoryRoute,
    priceCategoryPopupRoute,
    PriceCategoryResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...priceCategoryRoute,
    ...priceCategoryPopupRoute,
];

@NgModule({
    imports: [
        StorageManagementSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PriceCategoryComponent,
        PriceCategoryDetailComponent,
        PriceCategoryDialogComponent,
        PriceCategoryDeleteDialogComponent,
        PriceCategoryPopupComponent,
        PriceCategoryDeletePopupComponent,
    ],
    entryComponents: [
        PriceCategoryComponent,
        PriceCategoryDialogComponent,
        PriceCategoryPopupComponent,
        PriceCategoryDeleteDialogComponent,
        PriceCategoryDeletePopupComponent,
    ],
    providers: [
        PriceCategoryService,
        PriceCategoryPopupService,
        PriceCategoryResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StorageManagementPriceCategoryModule {}
