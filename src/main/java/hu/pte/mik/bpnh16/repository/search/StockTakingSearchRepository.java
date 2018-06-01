package hu.pte.mik.bpnh16.repository.search;

import hu.pte.mik.bpnh16.domain.StockTaking;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the StockTaking entity.
 */
public interface StockTakingSearchRepository extends ElasticsearchRepository<StockTaking, Long> {
}
