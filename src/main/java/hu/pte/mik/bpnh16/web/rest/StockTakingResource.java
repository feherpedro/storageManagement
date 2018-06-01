package hu.pte.mik.bpnh16.web.rest;

import com.codahale.metrics.annotation.Timed;
import hu.pte.mik.bpnh16.service.StockTakingService;
import hu.pte.mik.bpnh16.web.rest.errors.BadRequestAlertException;
import hu.pte.mik.bpnh16.web.rest.util.HeaderUtil;
import hu.pte.mik.bpnh16.web.rest.util.PaginationUtil;
import hu.pte.mik.bpnh16.service.dto.StockTakingDTO;
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
 * REST controller for managing StockTaking.
 */
@RestController
@RequestMapping("/api")
public class StockTakingResource {

    private final Logger log = LoggerFactory.getLogger(StockTakingResource.class);

    private static final String ENTITY_NAME = "stockTaking";

    private final StockTakingService stockTakingService;

    public StockTakingResource(StockTakingService stockTakingService) {
        this.stockTakingService = stockTakingService;
    }

    /**
     * POST  /stock-takings : Create a new stockTaking.
     *
     * @param stockTakingDTO the stockTakingDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stockTakingDTO, or with status 400 (Bad Request) if the stockTaking has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stock-takings")
    @Timed
    public ResponseEntity<StockTakingDTO> createStockTaking(@Valid @RequestBody StockTakingDTO stockTakingDTO) throws URISyntaxException {
        log.debug("REST request to save StockTaking : {}", stockTakingDTO);
        if (stockTakingDTO.getId() != null) {
            throw new BadRequestAlertException("A new stockTaking cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StockTakingDTO result = stockTakingService.save(stockTakingDTO);
        return ResponseEntity.created(new URI("/api/stock-takings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stock-takings : Updates an existing stockTaking.
     *
     * @param stockTakingDTO the stockTakingDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stockTakingDTO,
     * or with status 400 (Bad Request) if the stockTakingDTO is not valid,
     * or with status 500 (Internal Server Error) if the stockTakingDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stock-takings")
    @Timed
    public ResponseEntity<StockTakingDTO> updateStockTaking(@Valid @RequestBody StockTakingDTO stockTakingDTO) throws URISyntaxException {
        log.debug("REST request to update StockTaking : {}", stockTakingDTO);
        if (stockTakingDTO.getId() == null) {
            return createStockTaking(stockTakingDTO);
        }
        StockTakingDTO result = stockTakingService.save(stockTakingDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stockTakingDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stock-takings : get all the stockTakings.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of stockTakings in body
     */
    @GetMapping("/stock-takings")
    @Timed
    public ResponseEntity<List<StockTakingDTO>> getAllStockTakings(Pageable pageable) {
        log.debug("REST request to get a page of StockTakings");
        Page<StockTakingDTO> page = stockTakingService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stock-takings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /stock-takings/:id : get the "id" stockTaking.
     *
     * @param id the id of the stockTakingDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stockTakingDTO, or with status 404 (Not Found)
     */
    @GetMapping("/stock-takings/{id}")
    @Timed
    public ResponseEntity<StockTakingDTO> getStockTaking(@PathVariable Long id) {
        log.debug("REST request to get StockTaking : {}", id);
        StockTakingDTO stockTakingDTO = stockTakingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(stockTakingDTO));
    }

    /**
     * DELETE  /stock-takings/:id : delete the "id" stockTaking.
     *
     * @param id the id of the stockTakingDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stock-takings/{id}")
    @Timed
    public ResponseEntity<Void> deleteStockTaking(@PathVariable Long id) {
        log.debug("REST request to delete StockTaking : {}", id);
        stockTakingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/stock-takings?query=:query : search for the stockTaking corresponding
     * to the query.
     *
     * @param query the query of the stockTaking search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/stock-takings")
    @Timed
    public ResponseEntity<List<StockTakingDTO>> searchStockTakings(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of StockTakings for query {}", query);
        Page<StockTakingDTO> page = stockTakingService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/stock-takings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
