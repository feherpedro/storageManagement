/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StorageManagementTestModule } from '../../../test.module';
import { StockTakingDetailComponent } from '../../../../../../main/webapp/app/entities/stock-taking/stock-taking-detail.component';
import { StockTakingService } from '../../../../../../main/webapp/app/entities/stock-taking/stock-taking.service';
import { StockTaking } from '../../../../../../main/webapp/app/entities/stock-taking/stock-taking.model';

describe('Component Tests', () => {

    describe('StockTaking Management Detail Component', () => {
        let comp: StockTakingDetailComponent;
        let fixture: ComponentFixture<StockTakingDetailComponent>;
        let service: StockTakingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StorageManagementTestModule],
                declarations: [StockTakingDetailComponent],
                providers: [
                    StockTakingService
                ]
            })
            .overrideTemplate(StockTakingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StockTakingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockTakingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StockTaking(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.stockTaking).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
