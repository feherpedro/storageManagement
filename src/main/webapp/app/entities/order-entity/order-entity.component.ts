import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { OrderEntity } from './order-entity.model';
import { OrderEntityService } from './order-entity.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import {OrderItemService} from '../order-item/order-item.service';
import {OrderItem} from '../order-item';

@Component({
    selector: 'jhi-order-entity',
    templateUrl: './order-entity.component.html'
})
export class OrderEntityComponent implements OnInit, OnDestroy {

currentAccount: any;
    orderEntities: OrderEntity[];
    orderItems: OrderItem[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private orderEntityService: OrderEntityService,
        private orderItemService: OrderItemService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.orderEntityService.search({
                page: this.page - 1,
                query: this.currentSearch,
                size: this.itemsPerPage,
                sort: this.sort()}).subscribe(
                    (res: HttpResponse<OrderEntity[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.orderEntityService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
                (res: HttpResponse<OrderEntity[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/order-entity'], {queryParams:
            {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/order-entity', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate(['/order-entity', {
            search: this.currentSearch,
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderEntities();
    }

    ngOnDestroy() {
        if (this.eventSubscriber) {
            this.eventSubscriber.unsubscribe();
            // this.eventManager.destroy(this.eventSubscriber);
        }
        if (this.routeData) {
            this.routeData.unsubscribe();
        }
    }

    trackId(index: number, item: OrderEntity) {
        return item.id;
    }

    registerChangeInOrderEntities() {
        this.eventSubscriber = this.eventManager.subscribe('orderEntityListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.orderEntities = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private onRaktarClick(id: number) {
        this.orderItemService.query().subscribe((res: HttpResponse<OrderItem[]>) => {
            this.orderItems = res.body;
            this.orderItems = this.orderItems.filter((x) => x.orderEntityId === id);
            this.orderEntityService.placeIntoProducts(this.orderItems, id);
        }, (res: HttpErrorResponse) => this.onError(res.message));
    }
}
