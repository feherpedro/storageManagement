/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StorageManagementTestModule } from '../../../test.module';
import { StockTakingItemDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/stock-taking-item/stock-taking-item-delete-dialog.component';
import { StockTakingItemService } from '../../../../../../main/webapp/app/entities/stock-taking-item/stock-taking-item.service';

describe('Component Tests', () => {

    describe('StockTakingItem Management Delete Component', () => {
        let comp: StockTakingItemDeleteDialogComponent;
        let fixture: ComponentFixture<StockTakingItemDeleteDialogComponent>;
        let service: StockTakingItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StorageManagementTestModule],
                declarations: [StockTakingItemDeleteDialogComponent],
                providers: [
                    StockTakingItemService
                ]
            })
            .overrideTemplate(StockTakingItemDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StockTakingItemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockTakingItemService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
