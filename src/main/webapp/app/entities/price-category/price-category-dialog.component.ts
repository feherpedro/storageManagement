import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PriceCategory } from './price-category.model';
import { PriceCategoryPopupService } from './price-category-popup.service';
import { PriceCategoryService } from './price-category.service';

@Component({
    selector: 'jhi-price-category-dialog',
    templateUrl: './price-category-dialog.component.html'
})
export class PriceCategoryDialogComponent implements OnInit {

    priceCategory: PriceCategory;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private priceCategoryService: PriceCategoryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.priceCategory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.priceCategoryService.update(this.priceCategory));
        } else {
            this.subscribeToSaveResponse(
                this.priceCategoryService.create(this.priceCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PriceCategory>>) {
        result.subscribe((res: HttpResponse<PriceCategory>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PriceCategory) {
        this.eventManager.broadcast({ name: 'priceCategoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-price-category-popup',
    template: ''
})
export class PriceCategoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private priceCategoryPopupService: PriceCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.priceCategoryPopupService
                    .open(PriceCategoryDialogComponent as Component, params['id']);
            } else {
                this.priceCategoryPopupService
                    .open(PriceCategoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
