/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StorageManagementTestModule } from '../../../test.module';
import { StockTakingItemDialogComponent } from '../../../../../../main/webapp/app/entities/stock-taking-item/stock-taking-item-dialog.component';
import { StockTakingItemService } from '../../../../../../main/webapp/app/entities/stock-taking-item/stock-taking-item.service';
import { StockTakingItem } from '../../../../../../main/webapp/app/entities/stock-taking-item/stock-taking-item.model';
import { StockTakingService } from '../../../../../../main/webapp/app/entities/stock-taking';
import { ProductService } from '../../../../../../main/webapp/app/entities/product';
import { StatusService } from '../../../../../../main/webapp/app/entities/status';

describe('Component Tests', () => {

    describe('StockTakingItem Management Dialog Component', () => {
        let comp: StockTakingItemDialogComponent;
        let fixture: ComponentFixture<StockTakingItemDialogComponent>;
        let service: StockTakingItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StorageManagementTestModule],
                declarations: [StockTakingItemDialogComponent],
                providers: [
                    StockTakingService,
                    ProductService,
                    StatusService,
                    StockTakingItemService
                ]
            })
            .overrideTemplate(StockTakingItemDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StockTakingItemDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockTakingItemService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StockTakingItem(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.stockTakingItem = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stockTakingItemListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StockTakingItem();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.stockTakingItem = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stockTakingItemListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
