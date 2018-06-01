package hu.pte.mik.bpnh16.repository.search;

import hu.pte.mik.bpnh16.domain.PriceCategory;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PriceCategory entity.
 */
public interface PriceCategorySearchRepository extends ElasticsearchRepository<PriceCategory, Long> {
}
