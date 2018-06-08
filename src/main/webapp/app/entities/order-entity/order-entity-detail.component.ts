import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import { OrderEntity } from './order-entity.model';
import { OrderEntityService } from './order-entity.service';
import {QueryConstants} from '../../shared/constants/query.constants';
import {OrderItem, OrderItemService} from '../order-item';

@Component({
    selector: 'jhi-order-entity-detail',
    templateUrl: './order-entity-detail.component.html'
})
export class OrderEntityDetailComponent implements OnInit, OnDestroy {

    orderEntity: OrderEntity;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    hasItems: boolean;

    constructor(
        private eventManager: JhiEventManager,
        private orderEntityService: OrderEntityService,
        private orderItemService: OrderItemService,
        private jhiAlertService: JhiAlertService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrderEntities();
    }

    load(id) {
        this.orderEntityService.find(id)
            .subscribe((orderEntityResponse: HttpResponse<OrderEntity>) => {
                this.orderEntity = orderEntityResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrderEntities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'orderEntityListModification',
            (response) => this.load(this.orderEntity.id)
        );
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    isFinalized(): boolean {
        return this.orderEntity.statusId === QueryConstants.orderStatus.LEZARVA;
    }

    onRaktarClick(orderEntity: OrderEntity) {
        this.orderEntityService.placeIntoProducts(orderEntity.orderItemList, orderEntity.id).subscribe((response: HttpResponse<OrderEntity>) => {
            this.jhiAlertService.success(
                'storageManagementApp.orderEntity.raktarbaFelveve', response.body.id, null);
            this.eventManager.broadcast({ name: 'orderEntityListModification', content: 'OK'});
        }, (response: HttpErrorResponse) => this.onError(response.message));
    }

    hasItemsEmit(value: boolean) {
        this.hasItems = value;
    }
}
