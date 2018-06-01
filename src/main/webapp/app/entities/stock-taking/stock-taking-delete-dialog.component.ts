import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StockTaking } from './stock-taking.model';
import { StockTakingPopupService } from './stock-taking-popup.service';
import { StockTakingService } from './stock-taking.service';

@Component({
    selector: 'jhi-stock-taking-delete-dialog',
    templateUrl: './stock-taking-delete-dialog.component.html'
})
export class StockTakingDeleteDialogComponent {

    stockTaking: StockTaking;

    constructor(
        private stockTakingService: StockTakingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stockTakingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stockTakingListModification',
                content: 'Deleted an stockTaking'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stock-taking-delete-popup',
    template: ''
})
export class StockTakingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stockTakingPopupService: StockTakingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.stockTakingPopupService
                .open(StockTakingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
