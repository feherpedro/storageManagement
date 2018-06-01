import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { StockTakingItem } from './stock-taking-item.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StockTakingItem>;

@Injectable()
export class StockTakingItemService {

    private resourceUrl =  SERVER_API_URL + 'api/stock-taking-items';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/stock-taking-items';

    constructor(private http: HttpClient) { }

    create(stockTakingItem: StockTakingItem): Observable<EntityResponseType> {
        const copy = this.convert(stockTakingItem);
        return this.http.post<StockTakingItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stockTakingItem: StockTakingItem): Observable<EntityResponseType> {
        const copy = this.convert(stockTakingItem);
        return this.http.put<StockTakingItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StockTakingItem>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StockTakingItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<StockTakingItem[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StockTakingItem[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<StockTakingItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<StockTakingItem[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StockTakingItem[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StockTakingItem = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StockTakingItem[]>): HttpResponse<StockTakingItem[]> {
        const jsonResponse: StockTakingItem[] = res.body;
        const body: StockTakingItem[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StockTakingItem.
     */
    private convertItemFromServer(stockTakingItem: StockTakingItem): StockTakingItem {
        const copy: StockTakingItem = Object.assign({}, stockTakingItem);
        return copy;
    }

    /**
     * Convert a StockTakingItem to a JSON which can be sent to the server.
     */
    private convert(stockTakingItem: StockTakingItem): StockTakingItem {
        const copy: StockTakingItem = Object.assign({}, stockTakingItem);
        return copy;
    }
}
