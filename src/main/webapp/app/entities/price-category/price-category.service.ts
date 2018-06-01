import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PriceCategory } from './price-category.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PriceCategory>;

@Injectable()
export class PriceCategoryService {

    private resourceUrl =  SERVER_API_URL + 'api/price-categories';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/price-categories';

    constructor(private http: HttpClient) { }

    create(priceCategory: PriceCategory): Observable<EntityResponseType> {
        const copy = this.convert(priceCategory);
        return this.http.post<PriceCategory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(priceCategory: PriceCategory): Observable<EntityResponseType> {
        const copy = this.convert(priceCategory);
        return this.http.put<PriceCategory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PriceCategory>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PriceCategory[]>> {
        const options = createRequestOption(req);
        return this.http.get<PriceCategory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PriceCategory[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PriceCategory[]>> {
        const options = createRequestOption(req);
        return this.http.get<PriceCategory[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PriceCategory[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PriceCategory = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PriceCategory[]>): HttpResponse<PriceCategory[]> {
        const jsonResponse: PriceCategory[] = res.body;
        const body: PriceCategory[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PriceCategory.
     */
    private convertItemFromServer(priceCategory: PriceCategory): PriceCategory {
        const copy: PriceCategory = Object.assign({}, priceCategory);
        return copy;
    }

    /**
     * Convert a PriceCategory to a JSON which can be sent to the server.
     */
    private convert(priceCategory: PriceCategory): PriceCategory {
        const copy: PriceCategory = Object.assign({}, priceCategory);
        return copy;
    }
}
