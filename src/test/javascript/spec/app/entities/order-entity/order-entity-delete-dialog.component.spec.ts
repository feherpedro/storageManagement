/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StorageManagementTestModule } from '../../../test.module';
import { OrderEntityDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/order-entity/order-entity-delete-dialog.component';
import { OrderEntityService } from '../../../../../../main/webapp/app/entities/order-entity/order-entity.service';

describe('Component Tests', () => {

    describe('OrderEntity Management Delete Component', () => {
        let comp: OrderEntityDeleteDialogComponent;
        let fixture: ComponentFixture<OrderEntityDeleteDialogComponent>;
        let service: OrderEntityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StorageManagementTestModule],
                declarations: [OrderEntityDeleteDialogComponent],
                providers: [
                    OrderEntityService
                ]
            })
            .overrideTemplate(OrderEntityDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderEntityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderEntityService);
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
