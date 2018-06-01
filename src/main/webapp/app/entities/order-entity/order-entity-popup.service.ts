import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { OrderEntity } from './order-entity.model';
import { OrderEntityService } from './order-entity.service';

@Injectable()
export class OrderEntityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private orderEntityService: OrderEntityService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.orderEntityService.find(id)
                    .subscribe((orderEntityResponse: HttpResponse<OrderEntity>) => {
                        const orderEntity: OrderEntity = orderEntityResponse.body;
                        if (orderEntity.createDate) {
                            orderEntity.createDate = {
                                year: orderEntity.createDate.getFullYear(),
                                month: orderEntity.createDate.getMonth() + 1,
                                day: orderEntity.createDate.getDate()
                            };
                        }
                        if (orderEntity.paymentDate) {
                            orderEntity.paymentDate = {
                                year: orderEntity.paymentDate.getFullYear(),
                                month: orderEntity.paymentDate.getMonth() + 1,
                                day: orderEntity.paymentDate.getDate()
                            };
                        }
                        if (orderEntity.dueDate) {
                            orderEntity.dueDate = {
                                year: orderEntity.dueDate.getFullYear(),
                                month: orderEntity.dueDate.getMonth() + 1,
                                day: orderEntity.dueDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.orderEntityModalRef(component, orderEntity);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.orderEntityModalRef(component, new OrderEntity());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    orderEntityModalRef(component: Component, orderEntity: OrderEntity): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.orderEntity = orderEntity;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
