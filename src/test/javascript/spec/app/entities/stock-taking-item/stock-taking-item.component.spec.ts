/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StorageManagementTestModule } from '../../../test.module';
import { StockTakingItemComponent } from '../../../../../../main/webapp/app/entities/stock-taking-item/stock-taking-item.component';
import { StockTakingItemService } from '../../../../../../main/webapp/app/entities/stock-taking-item/stock-taking-item.service';
import { StockTakingItem } from '../../../../../../main/webapp/app/entities/stock-taking-item/stock-taking-item.model';

describe('Component Tests', () => {

    describe('StockTakingItem Management Component', () => {
        let comp: StockTakingItemComponent;
        let fixture: ComponentFixture<StockTakingItemComponent>;
        let service: StockTakingItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StorageManagementTestModule],
                declarations: [StockTakingItemComponent],
                providers: [
                    StockTakingItemService
                ]
            })
            .overrideTemplate(StockTakingItemComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StockTakingItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockTakingItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StockTakingItem(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stockTakingItems[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
