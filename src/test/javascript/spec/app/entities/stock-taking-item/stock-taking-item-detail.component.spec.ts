/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StorageManagementTestModule } from '../../../test.module';
import { StockTakingItemDetailComponent } from '../../../../../../main/webapp/app/entities/stock-taking-item/stock-taking-item-detail.component';
import { StockTakingItemService } from '../../../../../../main/webapp/app/entities/stock-taking-item/stock-taking-item.service';
import { StockTakingItem } from '../../../../../../main/webapp/app/entities/stock-taking-item/stock-taking-item.model';

describe('Component Tests', () => {

    describe('StockTakingItem Management Detail Component', () => {
        let comp: StockTakingItemDetailComponent;
        let fixture: ComponentFixture<StockTakingItemDetailComponent>;
        let service: StockTakingItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StorageManagementTestModule],
                declarations: [StockTakingItemDetailComponent],
                providers: [
                    StockTakingItemService
                ]
            })
            .overrideTemplate(StockTakingItemDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StockTakingItemDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockTakingItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StockTakingItem(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.stockTakingItem).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
