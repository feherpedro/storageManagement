/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StorageManagementTestModule } from '../../../test.module';
import { StockTakingDialogComponent } from '../../../../../../main/webapp/app/entities/stock-taking/stock-taking-dialog.component';
import { StockTakingService } from '../../../../../../main/webapp/app/entities/stock-taking/stock-taking.service';
import { StockTaking } from '../../../../../../main/webapp/app/entities/stock-taking/stock-taking.model';
import { StatusService } from '../../../../../../main/webapp/app/entities/status';

describe('Component Tests', () => {

    describe('StockTaking Management Dialog Component', () => {
        let comp: StockTakingDialogComponent;
        let fixture: ComponentFixture<StockTakingDialogComponent>;
        let service: StockTakingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StorageManagementTestModule],
                declarations: [StockTakingDialogComponent],
                providers: [
                    StatusService,
                    StockTakingService
                ]
            })
            .overrideTemplate(StockTakingDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StockTakingDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockTakingService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StockTaking(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.stockTaking = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stockTakingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StockTaking();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.stockTaking = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stockTakingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
