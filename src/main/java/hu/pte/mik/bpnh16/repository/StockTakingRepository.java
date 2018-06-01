package hu.pte.mik.bpnh16.repository;

import hu.pte.mik.bpnh16.domain.StockTaking;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the StockTaking entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StockTakingRepository extends JpaRepository<StockTaking, Long> {

}
