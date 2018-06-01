/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StorageManagementTestModule } from '../../../test.module';
import { OrderEntityDetailComponent } from '../../../../../../main/webapp/app/entities/order-entity/order-entity-detail.component';
import { OrderEntityService } from '../../../../../../main/webapp/app/entities/order-entity/order-entity.service';
import { OrderEntity } from '../../../../../../main/webapp/app/entities/order-entity/order-entity.model';

describe('Component Tests', () => {

    describe('OrderEntity Management Detail Component', () => {
        let comp: OrderEntityDetailComponent;
        let fixture: ComponentFixture<OrderEntityDetailComponent>;
        let service: OrderEntityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StorageManagementTestModule],
                declarations: [OrderEntityDetailComponent],
                providers: [
                    OrderEntityService
                ]
            })
            .overrideTemplate(OrderEntityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderEntityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderEntityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OrderEntity(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.orderEntity).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
