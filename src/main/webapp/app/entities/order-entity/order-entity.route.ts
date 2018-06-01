import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { OrderEntityComponent } from './order-entity.component';
import { OrderEntityDetailComponent } from './order-entity-detail.component';
import { OrderEntityPopupComponent } from './order-entity-dialog.component';
import { OrderEntityDeletePopupComponent } from './order-entity-delete-dialog.component';

@Injectable()
export class OrderEntityResolvePagingParams implements Resolve<any> {

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

export const orderEntityRoute: Routes = [
    {
        path: 'order-entity',
        component: OrderEntityComponent,
        resolve: {
            'pagingParams': OrderEntityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.orderEntity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'order-entity/:id',
        component: OrderEntityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.orderEntity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderEntityPopupRoute: Routes = [
    {
        path: 'order-entity-new',
        component: OrderEntityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.orderEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-entity/:id/edit',
        component: OrderEntityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.orderEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-entity/:id/delete',
        component: OrderEntityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storageManagementApp.orderEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
