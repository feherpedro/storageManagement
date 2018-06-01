import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PriceCategoryComponent } from './price-category.component';
import { PriceCategoryDetailComponent } from './price-category-detail.component';
import { PriceCategoryPopupComponent } from './price-category-dialog.component';
import { PriceCategoryDeletePopupComponent } from './price-category-delete-dialog.component';

@Injectable()
export class PriceCategoryResolvePagingParams implements Resolve<any> {

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

export const priceCategoryRoute: Routes = [
    {
        path: 'price-category',
        component: PriceCategoryComponent,
        resolve: {
            'pagingParams': PriceCategoryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.priceCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'price-category/:id',
        component: PriceCategoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.priceCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const priceCategoryPopupRoute: Routes = [
    {
        path: 'price-category-new',
        component: PriceCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.priceCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'price-category/:id/edit',
        component: PriceCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.priceCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'price-category/:id/delete',
        component: PriceCategoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.priceCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
