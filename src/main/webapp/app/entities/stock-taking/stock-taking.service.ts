import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { StockTaking } from './stock-taking.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StockTaking>;

@Injectable()
export class StockTakingService {

    private resourceUrl =  SERVER_API_URL + 'api/stock-takings';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/stock-takings';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(stockTaking: StockTaking): Observable<EntityResponseType> {
        const copy = this.convert(stockTaking);
        return this.http.post<StockTaking>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stockTaking: StockTaking): Observable<EntityResponseType> {
        const copy = this.convert(stockTaking);
        return this.http.put<StockTaking>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StockTaking>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StockTaking[]>> {
        const options = createRequestOption(req);
        return this.http.get<StockTaking[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StockTaking[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<StockTaking[]>> {
        const options = createRequestOption(req);
        return this.http.get<StockTaking[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StockTaking[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StockTaking = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StockTaking[]>): HttpResponse<StockTaking[]> {
        const jsonResponse: StockTaking[] = res.body;
        const body: StockTaking[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StockTaking.
     */
    private convertItemFromServer(stockTaking: StockTaking): StockTaking {
        const copy: StockTaking = Object.assign({}, stockTaking);
        copy.stockTakingDate = this.dateUtils
            .convertLocalDateFromServer(stockTaking.stockTakingDate);
        return copy;
    }

    /**
     * Convert a StockTaking to a JSON which can be sent to the server.
     */
    private convert(stockTaking: StockTaking): StockTaking {
        const copy: StockTaking = Object.assign({}, stockTaking);
        copy.stockTakingDate = this.dateUtils
            .convertLocalDateToServer(stockTaking.stockTakingDate);
        return copy;
    }
}
