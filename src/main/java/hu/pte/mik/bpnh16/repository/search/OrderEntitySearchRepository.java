package hu.pte.mik.bpnh16.repository.search;

import hu.pte.mik.bpnh16.domain.OrderEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the OrderEntity entity.
 */
public interface OrderEntitySearchRepository extends ElasticsearchRepository<OrderEntity, Long> {
}
