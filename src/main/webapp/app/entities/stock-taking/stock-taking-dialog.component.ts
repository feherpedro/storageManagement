import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StockTaking } from './stock-taking.model';
import { StockTakingPopupService } from './stock-taking-popup.service';
import { StockTakingService } from './stock-taking.service';
import { Status, StatusService } from '../status';

@Component({
    selector: 'jhi-stock-taking-dialog',
    templateUrl: './stock-taking-dialog.component.html'
})
export class StockTakingDialogComponent implements OnInit {

    stockTaking: StockTaking;
    isSaving: boolean;

    statuses: Status[];
    stockTakingDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stockTakingService: StockTakingService,
        private statusService: StatusService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.statusService.query()
            .subscribe((res: HttpResponse<Status[]>) => { this.statuses = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stockTaking.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stockTakingService.update(this.stockTaking));
        } else {
            this.subscribeToSaveResponse(
                this.stockTakingService.create(this.stockTaking));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StockTaking>>) {
        result.subscribe((res: HttpResponse<StockTaking>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StockTaking) {
        this.eventManager.broadcast({ name: 'stockTakingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStatusById(index: number, item: Status) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-stock-taking-popup',
    template: ''
})
export class StockTakingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stockTakingPopupService: StockTakingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.stockTakingPopupService
                    .open(StockTakingDialogComponent as Component, params['id']);
            } else {
                this.stockTakingPopupService
                    .open(StockTakingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
