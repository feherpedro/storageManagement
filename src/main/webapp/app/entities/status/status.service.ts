import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Status } from './status.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Status>;

@Injectable()
export class StatusService {

    private resourceUrl =  SERVER_API_URL + 'api/statuses';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/statuses';

    constructor(private http: HttpClient) { }

    create(status: Status): Observable<EntityResponseType> {
        const copy = this.convert(status);
        return this.http.post<Status>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(status: Status): Observable<EntityResponseType> {
        const copy = this.convert(status);
        return this.http.put<Status>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Status>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Status[]>> {
        const options = createRequestOption(req);
        return this.http.get<Status[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Status[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Status[]>> {
        const options = createRequestOption(req);
        return this.http.get<Status[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Status[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Status = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Status[]>): HttpResponse<Status[]> {
        const jsonResponse: Status[] = res.body;
        const body: Status[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Status.
     */
    private convertItemFromServer(status: Status): Status {
        const copy: Status = Object.assign({}, status);
        return copy;
    }

    /**
     * Convert a Status to a JSON which can be sent to the server.
     */
    private convert(status: Status): Status {
        const copy: Status = Object.assign({}, status);
        return copy;
    }
}
