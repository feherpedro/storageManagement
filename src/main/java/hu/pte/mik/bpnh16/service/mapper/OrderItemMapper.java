package hu.pte.mik.bpnh16.service.mapper;

import hu.pte.mik.bpnh16.domain.*;
import hu.pte.mik.bpnh16.service.dto.OrderItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrderItem and its DTO OrderItemDTO.
 */
@Mapper(componentModel = "spring", uses = {OrderEntityMapper.class, ProductMapper.class, StatusMapper.class})
public interface OrderItemMapper extends EntityMapper<OrderItemDTO, OrderItem> {

    @Mapping(source = "orderEntity.id", target = "orderEntityId")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    @Mapping(source = "product.unitOfMeasurement", target = "productUnitOfMeasurement")
    @Mapping(source = "product.barcode", target = "productBarcode")
    @Mapping(source = "status.id", target = "statusId")
    @Mapping(source = "status.name", target = "statusName")
    OrderItemDTO toDto(OrderItem orderItem);

    @Mapping(source = "orderEntityId", target = "orderEntity")
    @Mapping(source = "productId", target = "product")
    @Mapping(source = "statusId", target = "status")
    OrderItem toEntity(OrderItemDTO orderItemDTO);

    default OrderItem fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrderItem orderItem = new OrderItem();
        orderItem.setId(id);
        return orderItem;
    }
}
