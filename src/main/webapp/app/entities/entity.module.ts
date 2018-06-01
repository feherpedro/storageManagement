import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { StorageManagementProductModule } from './product/product.module';
import { StorageManagementProductCategoryModule } from './product-category/product-category.module';
import { StorageManagementPriceCategoryModule } from './price-category/price-category.module';
import { StorageManagementStatusModule } from './status/status.module';
import { StorageManagementOrderEntityModule } from './order-entity/order-entity.module';
import { StorageManagementOrderItemModule } from './order-item/order-item.module';
import { StorageManagementStockTakingModule } from './stock-taking/stock-taking.module';
import { StorageManagementStockTakingItemModule } from './stock-taking-item/stock-taking-item.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        StorageManagementProductModule,
        StorageManagementProductCategoryModule,
        StorageManagementPriceCategoryModule,
        StorageManagementStatusModule,
        StorageManagementOrderEntityModule,
        StorageManagementOrderItemModule,
        StorageManagementStockTakingModule,
        StorageManagementStockTakingItemModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StorageManagementEntityModule {}
