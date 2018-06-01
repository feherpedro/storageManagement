import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StockTakingItem } from './stock-taking-item.model';
import { StockTakingItemService } from './stock-taking-item.service';

@Component({
    selector: 'jhi-stock-taking-item-detail',
    templateUrl: './stock-taking-item-detail.component.html'
})
export class StockTakingItemDetailComponent implements OnInit, OnDestroy {

    stockTakingItem: StockTakingItem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stockTakingItemService: StockTakingItemService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStockTakingItems();
    }

    load(id) {
        this.stockTakingItemService.find(id)
            .subscribe((stockTakingItemResponse: HttpResponse<StockTakingItem>) => {
                this.stockTakingItem = stockTakingItemResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStockTakingItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stockTakingItemListModification',
            (response) => this.load(this.stockTakingItem.id)
        );
    }
}
