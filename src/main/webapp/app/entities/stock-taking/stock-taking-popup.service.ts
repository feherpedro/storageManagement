import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { StockTaking } from './stock-taking.model';
import { StockTakingService } from './stock-taking.service';

@Injectable()
export class StockTakingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private stockTakingService: StockTakingService

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
                this.stockTakingService.find(id)
                    .subscribe((stockTakingResponse: HttpResponse<StockTaking>) => {
                        const stockTaking: StockTaking = stockTakingResponse.body;
                        if (stockTaking.stockTakingDate) {
                            stockTaking.stockTakingDate = {
                                year: stockTaking.stockTakingDate.getFullYear(),
                                month: stockTaking.stockTakingDate.getMonth() + 1,
                                day: stockTaking.stockTakingDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.stockTakingModalRef(component, stockTaking);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.stockTakingModalRef(component, new StockTaking());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    stockTakingModalRef(component: Component, stockTaking: StockTaking): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.stockTaking = stockTaking;
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
