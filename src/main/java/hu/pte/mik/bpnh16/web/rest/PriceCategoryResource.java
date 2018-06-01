package hu.pte.mik.bpnh16.web.rest;

import com.codahale.metrics.annotation.Timed;
import hu.pte.mik.bpnh16.service.PriceCategoryService;
import hu.pte.mik.bpnh16.web.rest.errors.BadRequestAlertException;
import hu.pte.mik.bpnh16.web.rest.util.HeaderUtil;
import hu.pte.mik.bpnh16.web.rest.util.PaginationUtil;
import hu.pte.mik.bpnh16.service.dto.PriceCategoryDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing PriceCategory.
 */
@RestController
@RequestMapping("/api")
public class PriceCategoryResource {

    private final Logger log = LoggerFactory.getLogger(PriceCategoryResource.class);

    private static final String ENTITY_NAME = "priceCategory";

    private final PriceCategoryService priceCategoryService;

    public PriceCategoryResource(PriceCategoryService priceCategoryService) {
        this.priceCategoryService = priceCategoryService;
    }

    /**
     * POST  /price-categories : Create a new priceCategory.
     *
     * @param priceCategoryDTO the priceCategoryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new priceCategoryDTO, or with status 400 (Bad Request) if the priceCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/price-categories")
    @Timed
    public ResponseEntity<PriceCategoryDTO> createPriceCategory(@Valid @RequestBody PriceCategoryDTO priceCategoryDTO) throws URISyntaxException {
        log.debug("REST request to save PriceCategory : {}", priceCategoryDTO);
        if (priceCategoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new priceCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PriceCategoryDTO result = priceCategoryService.save(priceCategoryDTO);
        return ResponseEntity.created(new URI("/api/price-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /price-categories : Updates an existing priceCategory.
     *
     * @param priceCategoryDTO the priceCategoryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated priceCategoryDTO,
     * or with status 400 (Bad Request) if the priceCategoryDTO is not valid,
     * or with status 500 (Internal Server Error) if the priceCategoryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/price-categories")
    @Timed
    public ResponseEntity<PriceCategoryDTO> updatePriceCategory(@Valid @RequestBody PriceCategoryDTO priceCategoryDTO) throws URISyntaxException {
        log.debug("REST request to update PriceCategory : {}", priceCategoryDTO);
        if (priceCategoryDTO.getId() == null) {
            return createPriceCategory(priceCategoryDTO);
        }
        PriceCategoryDTO result = priceCategoryService.save(priceCategoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, priceCategoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /price-categories : get all the priceCategories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of priceCategories in body
     */
    @GetMapping("/price-categories")
    @Timed
    public ResponseEntity<List<PriceCategoryDTO>> getAllPriceCategories(Pageable pageable) {
        log.debug("REST request to get a page of PriceCategories");
        Page<PriceCategoryDTO> page = priceCategoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/price-categories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /price-categories/:id : get the "id" priceCategory.
     *
     * @param id the id of the priceCategoryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the priceCategoryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/price-categories/{id}")
    @Timed
    public ResponseEntity<PriceCategoryDTO> getPriceCategory(@PathVariable Long id) {
        log.debug("REST request to get PriceCategory : {}", id);
        PriceCategoryDTO priceCategoryDTO = priceCategoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(priceCategoryDTO));
    }

    /**
     * DELETE  /price-categories/:id : delete the "id" priceCategory.
     *
     * @param id the id of the priceCategoryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/price-categories/{id}")
    @Timed
    public ResponseEntity<Void> deletePriceCategory(@PathVariable Long id) {
        log.debug("REST request to delete PriceCategory : {}", id);
        priceCategoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/price-categories?query=:query : search for the priceCategory corresponding
     * to the query.
     *
     * @param query the query of the priceCategory search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/price-categories")
    @Timed
    public ResponseEntity<List<PriceCategoryDTO>> searchPriceCategories(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of PriceCategories for query {}", query);
        Page<PriceCategoryDTO> page = priceCategoryService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/price-categories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
