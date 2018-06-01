package hu.pte.mik.bpnh16.repository;

import hu.pte.mik.bpnh16.domain.StockTakingItem;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the StockTakingItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StockTakingItemRepository extends JpaRepository<StockTakingItem, Long> {

}
