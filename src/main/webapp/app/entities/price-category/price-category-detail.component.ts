import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PriceCategory } from './price-category.model';
import { PriceCategoryService } from './price-category.service';

@Component({
    selector: 'jhi-price-category-detail',
    templateUrl: './price-category-detail.component.html'
})
export class PriceCategoryDetailComponent implements OnInit, OnDestroy {

    priceCategory: PriceCategory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private priceCategoryService: PriceCategoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPriceCategories();
    }

    load(id) {
        this.priceCategoryService.find(id)
            .subscribe((priceCategoryResponse: HttpResponse<PriceCategory>) => {
                this.priceCategory = priceCategoryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPriceCategories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'priceCategoryListModification',
            (response) => this.load(this.priceCategory.id)
        );
    }
}
