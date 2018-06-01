package hu.pte.mik.bpnh16.repository.search;

import hu.pte.mik.bpnh16.domain.StockTakingItem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the StockTakingItem entity.
 */
public interface StockTakingItemSearchRepository extends ElasticsearchRepository<StockTakingItem, Long> {
}
