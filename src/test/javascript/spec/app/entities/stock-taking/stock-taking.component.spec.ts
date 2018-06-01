/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StorageManagementTestModule } from '../../../test.module';
import { StockTakingComponent } from '../../../../../../main/webapp/app/entities/stock-taking/stock-taking.component';
import { StockTakingService } from '../../../../../../main/webapp/app/entities/stock-taking/stock-taking.service';
import { StockTaking } from '../../../../../../main/webapp/app/entities/stock-taking/stock-taking.model';

describe('Component Tests', () => {

    describe('StockTaking Management Component', () => {
        let comp: StockTakingComponent;
        let fixture: ComponentFixture<StockTakingComponent>;
        let service: StockTakingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StorageManagementTestModule],
                declarations: [StockTakingComponent],
                providers: [
                    StockTakingService
                ]
            })
            .overrideTemplate(StockTakingComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StockTakingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockTakingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StockTaking(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stockTakings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
