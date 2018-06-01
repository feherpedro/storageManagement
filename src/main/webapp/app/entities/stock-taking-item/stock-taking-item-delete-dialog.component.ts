import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StockTakingItem } from './stock-taking-item.model';
import { StockTakingItemPopupService } from './stock-taking-item-popup.service';
import { StockTakingItemService } from './stock-taking-item.service';

@Component({
    selector: 'jhi-stock-taking-item-delete-dialog',
    templateUrl: './stock-taking-item-delete-dialog.component.html'
})
export class StockTakingItemDeleteDialogComponent {

    stockTakingItem: StockTakingItem;

    constructor(
        private stockTakingItemService: StockTakingItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stockTakingItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stockTakingItemListModification',
                content: 'Deleted an stockTakingItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stock-taking-item-delete-popup',
    template: ''
})
export class StockTakingItemDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stockTakingItemPopupService: StockTakingItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.stockTakingItemPopupService
                .open(StockTakingItemDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
