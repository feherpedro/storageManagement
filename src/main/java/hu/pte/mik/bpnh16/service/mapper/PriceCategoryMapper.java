package hu.pte.mik.bpnh16.service.mapper;

import hu.pte.mik.bpnh16.domain.*;
import hu.pte.mik.bpnh16.service.dto.PriceCategoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PriceCategory and its DTO PriceCategoryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PriceCategoryMapper extends EntityMapper<PriceCategoryDTO, PriceCategory> {



    default PriceCategory fromId(Long id) {
        if (id == null) {
            return null;
        }
        PriceCategory priceCategory = new PriceCategory();
        priceCategory.setId(id);
        return priceCategory;
    }
}
