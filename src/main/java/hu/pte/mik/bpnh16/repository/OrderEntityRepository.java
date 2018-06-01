package hu.pte.mik.bpnh16.repository;

import hu.pte.mik.bpnh16.domain.OrderEntity;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OrderEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderEntityRepository extends JpaRepository<OrderEntity, Long> {

}
