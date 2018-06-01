import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StockTaking } from './stock-taking.model';
import { StockTakingService } from './stock-taking.service';

@Component({
    selector: 'jhi-stock-taking-detail',
    templateUrl: './stock-taking-detail.component.html'
})
export class StockTakingDetailComponent implements OnInit, OnDestroy {

    stockTaking: StockTaking;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stockTakingService: StockTakingService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStockTakings();
    }

    load(id) {
        this.stockTakingService.find(id)
            .subscribe((stockTakingResponse: HttpResponse<StockTaking>) => {
                this.stockTaking = stockTakingResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStockTakings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stockTakingListModification',
            (response) => this.load(this.stockTaking.id)
        );
    }
}
