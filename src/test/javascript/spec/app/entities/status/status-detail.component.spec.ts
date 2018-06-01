/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StorageManagementTestModule } from '../../../test.module';
import { StatusDetailComponent } from '../../../../../../main/webapp/app/entities/status/status-detail.component';
import { StatusService } from '../../../../../../main/webapp/app/entities/status/status.service';
import { Status } from '../../../../../../main/webapp/app/entities/status/status.model';

describe('Component Tests', () => {

    describe('Status Management Detail Component', () => {
        let comp: StatusDetailComponent;
        let fixture: ComponentFixture<StatusDetailComponent>;
        let service: StatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StorageManagementTestModule],
                declarations: [StatusDetailComponent],
                providers: [
                    StatusService
                ]
            })
            .overrideTemplate(StatusDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StatusDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Status(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.status).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
