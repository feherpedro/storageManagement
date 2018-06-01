package hu.pte.mik.bpnh16.repository.search;

import hu.pte.mik.bpnh16.domain.OrderItem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the OrderItem entity.
 */
public interface OrderItemSearchRepository extends ElasticsearchRepository<OrderItem, Long> {
}
