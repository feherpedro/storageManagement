import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrderEntity } from './order-entity.model';
import { OrderEntityService } from './order-entity.service';
import {QueryConstants} from '../../shared/constants/query.constants';

@Component({
    selector: 'jhi-order-entity-detail',
    templateUrl: './order-entity-detail.component.html'
})
export class OrderEntityDetailComponent implements OnInit, OnDestroy {

    orderEntity: OrderEntity;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private orderEntityService: OrderEntityService,
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

    isFinalized(): boolean {
        return this.orderEntity.statusId === QueryConstants.orderStatus.LEZARVA;
    }
}
