/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StorageManagementTestModule } from '../../../test.module';
import { PriceCategoryComponent } from '../../../../../../main/webapp/app/entities/price-category/price-category.component';
import { PriceCategoryService } from '../../../../../../main/webapp/app/entities/price-category/price-category.service';
import { PriceCategory } from '../../../../../../main/webapp/app/entities/price-category/price-category.model';

describe('Component Tests', () => {

    describe('PriceCategory Management Component', () => {
        let comp: PriceCategoryComponent;
        let fixture: ComponentFixture<PriceCategoryComponent>;
        let service: PriceCategoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StorageManagementTestModule],
                declarations: [PriceCategoryComponent],
                providers: [
                    PriceCategoryService
                ]
            })
            .overrideTemplate(PriceCategoryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PriceCategoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PriceCategoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PriceCategory(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.priceCategories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
