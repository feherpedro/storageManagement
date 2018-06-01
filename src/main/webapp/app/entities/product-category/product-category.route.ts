import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ProductCategoryComponent } from './product-category.component';
import { ProductCategoryDetailComponent } from './product-category-detail.component';
import { ProductCategoryPopupComponent } from './product-category-dialog.component';
import { ProductCategoryDeletePopupComponent } from './product-category-delete-dialog.component';

@Injectable()
export class ProductCategoryResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const productCategoryRoute: Routes = [
    {
        path: 'product-category',
        component: ProductCategoryComponent,
        resolve: {
            'pagingParams': ProductCategoryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-category/:id',
        component: ProductCategoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productCategoryPopupRoute: Routes = [
    {
        path: 'product-category-new',
        component: ProductCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-category/:id/edit',
        component: ProductCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-category/:id/delete',
        component: ProductCategoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
