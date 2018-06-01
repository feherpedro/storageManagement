import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderEntity } from './order-entity.model';
import { OrderEntityPopupService } from './order-entity-popup.service';
import { OrderEntityService } from './order-entity.service';
import { Status, StatusService } from '../status';

@Component({
    selector: 'jhi-order-entity-dialog',
    templateUrl: './order-entity-dialog.component.html'
})
export class OrderEntityDialogComponent implements OnInit {

    orderEntity: OrderEntity;
    isSaving: boolean;

    statuses: Status[];
    createDateDp: any;
    paymentDateDp: any;
    dueDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private orderEntityService: OrderEntityService,
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
        if (this.orderEntity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderEntityService.update(this.orderEntity));
        } else {
            this.subscribeToSaveResponse(
                this.orderEntityService.create(this.orderEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrderEntity>>) {
        result.subscribe((res: HttpResponse<OrderEntity>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderEntity) {
        this.eventManager.broadcast({ name: 'orderEntityListModification', content: 'OK'});
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
    selector: 'jhi-order-entity-popup',
    template: ''
})
export class OrderEntityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderEntityPopupService: OrderEntityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderEntityPopupService
                    .open(OrderEntityDialogComponent as Component, params['id']);
            } else {
                this.orderEntityPopupService
                    .open(OrderEntityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
