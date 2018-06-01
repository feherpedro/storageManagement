import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StockTakingItemComponent } from './stock-taking-item.component';
import { StockTakingItemDetailComponent } from './stock-taking-item-detail.component';
import { StockTakingItemPopupComponent } from './stock-taking-item-dialog.component';
import { StockTakingItemDeletePopupComponent } from './stock-taking-item-delete-dialog.component';

@Injectable()
export class StockTakingItemResolvePagingParams implements Resolve<any> {

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

export const stockTakingItemRoute: Routes = [
    {
        path: 'stock-taking-item',
        component: StockTakingItemComponent,
        resolve: {
            'pagingParams': StockTakingItemResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.stockTakingItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'stock-taking-item/:id',
        component: StockTakingItemDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.stockTakingItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stockTakingItemPopupRoute: Routes = [
    {
        path: 'stock-taking-item-new',
        component: StockTakingItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.stockTakingItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stock-taking-item/:id/edit',
        component: StockTakingItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.stockTakingItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stock-taking-item/:id/delete',
        component: StockTakingItemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.stockTakingItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
