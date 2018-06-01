import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderEntity } from './order-entity.model';
import { OrderEntityPopupService } from './order-entity-popup.service';
import { OrderEntityService } from './order-entity.service';

@Component({
    selector: 'jhi-order-entity-delete-dialog',
    templateUrl: './order-entity-delete-dialog.component.html'
})
export class OrderEntityDeleteDialogComponent {

    orderEntity: OrderEntity;

    constructor(
        private orderEntityService: OrderEntityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderEntityService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'orderEntityListModification',
                content: 'Deleted an orderEntity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-entity-delete-popup',
    template: ''
})
export class OrderEntityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderEntityPopupService: OrderEntityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.orderEntityPopupService
                .open(OrderEntityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
