import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { StockTakingItem } from './stock-taking-item.model';
import { StockTakingItemService } from './stock-taking-item.service';

@Injectable()
export class StockTakingItemPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private stockTakingItemService: StockTakingItemService

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
                this.stockTakingItemService.find(id)
                    .subscribe((stockTakingItemResponse: HttpResponse<StockTakingItem>) => {
                        const stockTakingItem: StockTakingItem = stockTakingItemResponse.body;
                        this.ngbModalRef = this.stockTakingItemModalRef(component, stockTakingItem);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.stockTakingItemModalRef(component, new StockTakingItem());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    stockTakingItemModalRef(component: Component, stockTakingItem: StockTakingItem): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.stockTakingItem = stockTakingItem;
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
