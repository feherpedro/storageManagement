import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderItem } from './order-item.model';
import { OrderItemPopupService } from './order-item-popup.service';
import { OrderItemService } from './order-item.service';
import { OrderEntity, OrderEntityService } from '../order-entity';
import { Product, ProductService } from '../product';
import { Status, StatusService } from '../status';

@Component({
    selector: 'jhi-order-item-dialog',
    templateUrl: './order-item-dialog.component.html'
})
export class OrderItemDialogComponent implements OnInit {

    @Input() parent: number;

    orderItem: OrderItem;
    isSaving: boolean;
    hasOrderNumber: boolean;

    orderentities: OrderEntity[];

    products: Product[];

    statuses: Status[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private orderItemService: OrderItemService,
        private orderEntityService: OrderEntityService,
        private productService: ProductService,
        private statusService: StatusService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        if (this.parent != null) {
            this.orderItem.orderEntityId = this.parent;
        }
        this.isSaving = false;
        this.orderEntityService.query()
        .subscribe((res: HttpResponse<OrderEntity[]>) => {
            this.orderentities = res.body;
        }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productService.query()
        .subscribe((res: HttpResponse<Product[]>) => {
            this.products = res.body;
        }, (res: HttpErrorResponse) => this.onError(res.message));
        this.statusService.query()
        .subscribe((res: HttpResponse<Status[]>) => {
            this.statuses = res.body;
        }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.orderItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderItemService.update(this.orderItem));
        } else {
            this.subscribeToSaveResponse(
                this.orderItemService.create(this.orderItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrderItem>>) {
        result.subscribe((res: HttpResponse<OrderItem>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderItem) {
        this.eventManager.broadcast({ name: 'orderItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOrderEntityById(index: number, item: OrderEntity) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackStatusById(index: number, item: Status) {
        return item.id;
    }

    productChanged(productId: number) {
        setTimeout(() => {
            this.orderItem.productUnitOfMeasurement = this.products.filter( (product) => product.id === productId)[0].unitOfMeasurement;
        }, 0);
    }
}

@Component({
    selector: 'jhi-order-item-popup',
    template: ''
})
export class OrderItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderItemPopupService: OrderItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderItemPopupService
                    .open(OrderItemDialogComponent as Component, params['id'], params['parent']);
            } else {
                this.orderItemPopupService
                    .open(OrderItemDialogComponent as Component, null, params['parent']);
            }
        });
    }

    ngOnDestroy() {
        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
    }
}
