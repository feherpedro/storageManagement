/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StorageManagementTestModule } from '../../../test.module';
import { PriceCategoryDetailComponent } from '../../../../../../main/webapp/app/entities/price-category/price-category-detail.component';
import { PriceCategoryService } from '../../../../../../main/webapp/app/entities/price-category/price-category.service';
import { PriceCategory } from '../../../../../../main/webapp/app/entities/price-category/price-category.model';

describe('Component Tests', () => {

    describe('PriceCategory Management Detail Component', () => {
        let comp: PriceCategoryDetailComponent;
        let fixture: ComponentFixture<PriceCategoryDetailComponent>;
        let service: PriceCategoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StorageManagementTestModule],
                declarations: [PriceCategoryDetailComponent],
                providers: [
                    PriceCategoryService
                ]
            })
            .overrideTemplate(PriceCategoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PriceCategoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PriceCategoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PriceCategory(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.priceCategory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
