import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PriceCategory } from './price-category.model';
import { PriceCategoryPopupService } from './price-category-popup.service';
import { PriceCategoryService } from './price-category.service';

@Component({
    selector: 'jhi-price-category-delete-dialog',
    templateUrl: './price-category-delete-dialog.component.html'
})
export class PriceCategoryDeleteDialogComponent {

    priceCategory: PriceCategory;

    constructor(
        private priceCategoryService: PriceCategoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.priceCategoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'priceCategoryListModification',
                content: 'Deleted an priceCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-price-category-delete-popup',
    template: ''
})
export class PriceCategoryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private priceCategoryPopupService: PriceCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.priceCategoryPopupService
                .open(PriceCategoryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
