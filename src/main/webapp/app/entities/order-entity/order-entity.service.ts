import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { OrderEntity } from './order-entity.model';
import { createRequestOption } from '../../shared';
import {OrderItem} from '../order-item';

export type EntityResponseType = HttpResponse<OrderEntity>;

@Injectable()
export class OrderEntityService {

    private resourceUrl =  SERVER_API_URL + 'api/order-entities';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/order-entities';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(orderEntity: OrderEntity): Observable<EntityResponseType> {
        const copy = this.convert(orderEntity);
        return this.http.post<OrderEntity>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    placeIntoProducts(orderItems: OrderItem[], id: number): Observable<EntityResponseType> {
        return this.http.put<OrderEntity>(`${this.resourceUrl}/${id}/placeIntoProducts`, orderItems, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(orderEntity: OrderEntity): Observable<EntityResponseType> {
        const copy = this.convert(orderEntity);
        return this.http.put<OrderEntity>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrderEntity>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrderEntity[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderEntity[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderEntity[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<OrderEntity[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderEntity[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderEntity[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrderEntity = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrderEntity[]>): HttpResponse<OrderEntity[]> {
        const jsonResponse: OrderEntity[] = res.body;
        const body: OrderEntity[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrderEntity.
     */
    private convertItemFromServer(orderEntity: OrderEntity): OrderEntity {
        const copy: OrderEntity = Object.assign({}, orderEntity);
        copy.createDate = this.dateUtils
            .convertLocalDateFromServer(orderEntity.createDate);
        copy.paymentDate = this.dateUtils
            .convertLocalDateFromServer(orderEntity.paymentDate);
        copy.dueDate = this.dateUtils
            .convertLocalDateFromServer(orderEntity.dueDate);
        return copy;
    }

    /**
     * Convert a OrderEntity to a JSON which can be sent to the server.
     */
    private convert(orderEntity: OrderEntity): OrderEntity {
        const copy: OrderEntity = Object.assign({}, orderEntity);
        copy.createDate = this.dateUtils
            .convertLocalDateToServer(orderEntity.createDate);
        copy.paymentDate = this.dateUtils
            .convertLocalDateToServer(orderEntity.paymentDate);
        copy.dueDate = this.dateUtils
            .convertLocalDateToServer(orderEntity.dueDate);
        return copy;
    }
}
