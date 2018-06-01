/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StorageManagementTestModule } from '../../../test.module';
import { OrderEntityComponent } from '../../../../../../main/webapp/app/entities/order-entity/order-entity.component';
import { OrderEntityService } from '../../../../../../main/webapp/app/entities/order-entity/order-entity.service';
import { OrderEntity } from '../../../../../../main/webapp/app/entities/order-entity/order-entity.model';

describe('Component Tests', () => {

    describe('OrderEntity Management Component', () => {
        let comp: OrderEntityComponent;
        let fixture: ComponentFixture<OrderEntityComponent>;
        let service: OrderEntityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StorageManagementTestModule],
                declarations: [OrderEntityComponent],
                providers: [
                    OrderEntityService
                ]
            })
            .overrideTemplate(OrderEntityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderEntityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderEntityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OrderEntity(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.orderEntities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
