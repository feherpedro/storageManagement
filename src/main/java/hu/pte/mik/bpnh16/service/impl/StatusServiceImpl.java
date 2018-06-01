package hu.pte.mik.bpnh16.service.impl;

import hu.pte.mik.bpnh16.service.StatusService;
import hu.pte.mik.bpnh16.domain.Status;
import hu.pte.mik.bpnh16.repository.StatusRepository;
import hu.pte.mik.bpnh16.repository.search.StatusSearchRepository;
import hu.pte.mik.bpnh16.service.dto.StatusDTO;
import hu.pte.mik.bpnh16.service.mapper.StatusMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Status.
 */
@Service
@Transactional
public class StatusServiceImpl implements StatusService {

    private final Logger log = LoggerFactory.getLogger(StatusServiceImpl.class);

    private final StatusRepository statusRepository;

    private final StatusMapper statusMapper;

    private final StatusSearchRepository statusSearchRepository;

    public StatusServiceImpl(StatusRepository statusRepository, StatusMapper statusMapper, StatusSearchRepository statusSearchRepository) {
        this.statusRepository = statusRepository;
        this.statusMapper = statusMapper;
        this.statusSearchRepository = statusSearchRepository;
    }

    /**
     * Save a status.
     *
     * @param statusDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public StatusDTO save(StatusDTO statusDTO) {
        log.debug("Request to save Status : {}", statusDTO);
        Status status = statusMapper.toEntity(statusDTO);
        status = statusRepository.save(status);
        StatusDTO result = statusMapper.toDto(status);
        statusSearchRepository.save(status);
        return result;
    }

    /**
     * Get all the statuses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<StatusDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Statuses");
        return statusRepository.findAll(pageable)
            .map(statusMapper::toDto);
    }

    /**
     * Get one status by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public StatusDTO findOne(Long id) {
        log.debug("Request to get Status : {}", id);
        Status status = statusRepository.findOne(id);
        return statusMapper.toDto(status);
    }

    /**
     * Delete the status by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Status : {}", id);
        statusRepository.delete(id);
        statusSearchRepository.delete(id);
    }

    /**
     * Search for the status corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<StatusDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Statuses for query {}", query);
        Page<Status> result = statusSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(statusMapper::toDto);
    }
}
