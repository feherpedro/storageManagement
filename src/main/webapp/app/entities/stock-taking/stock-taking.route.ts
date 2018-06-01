import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StockTakingComponent } from './stock-taking.component';
import { StockTakingDetailComponent } from './stock-taking-detail.component';
import { StockTakingPopupComponent } from './stock-taking-dialog.component';
import { StockTakingDeletePopupComponent } from './stock-taking-delete-dialog.component';

@Injectable()
export class StockTakingResolvePagingParams implements Resolve<any> {

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

export const stockTakingRoute: Routes = [
    {
        path: 'stock-taking',
        component: StockTakingComponent,
        resolve: {
            'pagingParams': StockTakingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.stockTaking.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'stock-taking/:id',
        component: StockTakingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.stockTaking.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stockTakingPopupRoute: Routes = [
    {
        path: 'stock-taking-new',
        component: StockTakingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.stockTaking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stock-taking/:id/edit',
        component: StockTakingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.stockTaking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stock-taking/:id/delete',
        component: StockTakingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.stockTaking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
