package hu.pte.mik.bpnh16.service;

import hu.pte.mik.bpnh16.service.dto.OrderEntityDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing OrderEntity.
 */
public interface OrderEntityService {

    /**
     * Save a orderEntity.
     *
     * @param orderEntityDTO the entity to save
     * @return the persisted entity
     */
    OrderEntityDTO save(OrderEntityDTO orderEntityDTO);

    /**
     * Get all the orderEntities.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<OrderEntityDTO> findAll(Pageable pageable);

    /**
     * Get the "id" orderEntity.
     *
     * @param id the id of the entity
     * @return the entity
     */
    OrderEntityDTO findOne(Long id);

    /**
     * Delete the "id" orderEntity.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the orderEntity corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<OrderEntityDTO> search(String query, Pageable pageable);
}
