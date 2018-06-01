import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StockTakingItem } from './stock-taking-item.model';
import { StockTakingItemPopupService } from './stock-taking-item-popup.service';
import { StockTakingItemService } from './stock-taking-item.service';
import { StockTaking, StockTakingService } from '../stock-taking';
import { Product, ProductService } from '../product';
import { Status, StatusService } from '../status';

@Component({
    selector: 'jhi-stock-taking-item-dialog',
    templateUrl: './stock-taking-item-dialog.component.html'
})
export class StockTakingItemDialogComponent implements OnInit {

    stockTakingItem: StockTakingItem;
    isSaving: boolean;

    stocktakings: StockTaking[];

    products: Product[];

    statuses: Status[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stockTakingItemService: StockTakingItemService,
        private stockTakingService: StockTakingService,
        private productService: ProductService,
        private statusService: StatusService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.stockTakingService.query()
            .subscribe((res: HttpResponse<StockTaking[]>) => { this.stocktakings = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.statusService.query()
            .subscribe((res: HttpResponse<Status[]>) => { this.statuses = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stockTakingItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stockTakingItemService.update(this.stockTakingItem));
        } else {
            this.subscribeToSaveResponse(
                this.stockTakingItemService.create(this.stockTakingItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StockTakingItem>>) {
        result.subscribe((res: HttpResponse<StockTakingItem>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StockTakingItem) {
        this.eventManager.broadcast({ name: 'stockTakingItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStockTakingById(index: number, item: StockTaking) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackStatusById(index: number, item: Status) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-stock-taking-item-popup',
    template: ''
})
export class StockTakingItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stockTakingItemPopupService: StockTakingItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.stockTakingItemPopupService
                    .open(StockTakingItemDialogComponent as Component, params['id']);
            } else {
                this.stockTakingItemPopupService
                    .open(StockTakingItemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
