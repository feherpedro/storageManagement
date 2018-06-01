package hu.pte.mik.bpnh16.web.rest;

import hu.pte.mik.bpnh16.StorageManagementApp;

import hu.pte.mik.bpnh16.domain.OrderEntity;
import hu.pte.mik.bpnh16.repository.OrderEntityRepository;
import hu.pte.mik.bpnh16.service.OrderEntityService;
import hu.pte.mik.bpnh16.repository.search.OrderEntitySearchRepository;
import hu.pte.mik.bpnh16.service.dto.OrderEntityDTO;
import hu.pte.mik.bpnh16.service.mapper.OrderEntityMapper;
import hu.pte.mik.bpnh16.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static hu.pte.mik.bpnh16.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the OrderEntityResource REST controller.
 *
 * @see OrderEntityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StorageManagementApp.class)
public class OrderEntityResourceIntTest {

    private static final LocalDate DEFAULT_CREATE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_PAYMENT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PAYMENT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DUE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DUE_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private OrderEntityRepository orderEntityRepository;

    @Autowired
    private OrderEntityMapper orderEntityMapper;

    @Autowired
    private OrderEntityService orderEntityService;

    @Autowired
    private OrderEntitySearchRepository orderEntitySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrderEntityMockMvc;

    private OrderEntity orderEntity;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderEntityResource orderEntityResource = new OrderEntityResource(orderEntityService);
        this.restOrderEntityMockMvc = MockMvcBuilders.standaloneSetup(orderEntityResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrderEntity createEntity(EntityManager em) {
        OrderEntity orderEntity = new OrderEntity()
            .createDate(DEFAULT_CREATE_DATE)
            .paymentDate(DEFAULT_PAYMENT_DATE)
            .dueDate(DEFAULT_DUE_DATE);
        return orderEntity;
    }

    @Before
    public void initTest() {
        orderEntitySearchRepository.deleteAll();
        orderEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrderEntity() throws Exception {
        int databaseSizeBeforeCreate = orderEntityRepository.findAll().size();

        // Create the OrderEntity
        OrderEntityDTO orderEntityDTO = orderEntityMapper.toDto(orderEntity);
        restOrderEntityMockMvc.perform(post("/api/order-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEntityDTO)))
            .andExpect(status().isCreated());

        // Validate the OrderEntity in the database
        List<OrderEntity> orderEntityList = orderEntityRepository.findAll();
        assertThat(orderEntityList).hasSize(databaseSizeBeforeCreate + 1);
        OrderEntity testOrderEntity = orderEntityList.get(orderEntityList.size() - 1);
        assertThat(testOrderEntity.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testOrderEntity.getPaymentDate()).isEqualTo(DEFAULT_PAYMENT_DATE);
        assertThat(testOrderEntity.getDueDate()).isEqualTo(DEFAULT_DUE_DATE);

        // Validate the OrderEntity in Elasticsearch
        OrderEntity orderEntityEs = orderEntitySearchRepository.findOne(testOrderEntity.getId());
        assertThat(orderEntityEs).isEqualToIgnoringGivenFields(testOrderEntity);
    }

    @Test
    @Transactional
    public void createOrderEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderEntityRepository.findAll().size();

        // Create the OrderEntity with an existing ID
        orderEntity.setId(1L);
        OrderEntityDTO orderEntityDTO = orderEntityMapper.toDto(orderEntity);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderEntityMockMvc.perform(post("/api/order-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEntityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OrderEntity in the database
        List<OrderEntity> orderEntityList = orderEntityRepository.findAll();
        assertThat(orderEntityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCreateDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderEntityRepository.findAll().size();
        // set the field null
        orderEntity.setCreateDate(null);

        // Create the OrderEntity, which fails.
        OrderEntityDTO orderEntityDTO = orderEntityMapper.toDto(orderEntity);

        restOrderEntityMockMvc.perform(post("/api/order-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEntityDTO)))
            .andExpect(status().isBadRequest());

        List<OrderEntity> orderEntityList = orderEntityRepository.findAll();
        assertThat(orderEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrderEntities() throws Exception {
        // Initialize the database
        orderEntityRepository.saveAndFlush(orderEntity);

        // Get all the orderEntityList
        restOrderEntityMockMvc.perform(get("/api/order-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].paymentDate").value(hasItem(DEFAULT_PAYMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].dueDate").value(hasItem(DEFAULT_DUE_DATE.toString())));
    }

    @Test
    @Transactional
    public void getOrderEntity() throws Exception {
        // Initialize the database
        orderEntityRepository.saveAndFlush(orderEntity);

        // Get the orderEntity
        restOrderEntityMockMvc.perform(get("/api/order-entities/{id}", orderEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderEntity.getId().intValue()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.paymentDate").value(DEFAULT_PAYMENT_DATE.toString()))
            .andExpect(jsonPath("$.dueDate").value(DEFAULT_DUE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrderEntity() throws Exception {
        // Get the orderEntity
        restOrderEntityMockMvc.perform(get("/api/order-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrderEntity() throws Exception {
        // Initialize the database
        orderEntityRepository.saveAndFlush(orderEntity);
        orderEntitySearchRepository.save(orderEntity);
        int databaseSizeBeforeUpdate = orderEntityRepository.findAll().size();

        // Update the orderEntity
        OrderEntity updatedOrderEntity = orderEntityRepository.findOne(orderEntity.getId());
        // Disconnect from session so that the updates on updatedOrderEntity are not directly saved in db
        em.detach(updatedOrderEntity);
        updatedOrderEntity
            .createDate(UPDATED_CREATE_DATE)
            .paymentDate(UPDATED_PAYMENT_DATE)
            .dueDate(UPDATED_DUE_DATE);
        OrderEntityDTO orderEntityDTO = orderEntityMapper.toDto(updatedOrderEntity);

        restOrderEntityMockMvc.perform(put("/api/order-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEntityDTO)))
            .andExpect(status().isOk());

        // Validate the OrderEntity in the database
        List<OrderEntity> orderEntityList = orderEntityRepository.findAll();
        assertThat(orderEntityList).hasSize(databaseSizeBeforeUpdate);
        OrderEntity testOrderEntity = orderEntityList.get(orderEntityList.size() - 1);
        assertThat(testOrderEntity.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testOrderEntity.getPaymentDate()).isEqualTo(UPDATED_PAYMENT_DATE);
        assertThat(testOrderEntity.getDueDate()).isEqualTo(UPDATED_DUE_DATE);

        // Validate the OrderEntity in Elasticsearch
        OrderEntity orderEntityEs = orderEntitySearchRepository.findOne(testOrderEntity.getId());
        assertThat(orderEntityEs).isEqualToIgnoringGivenFields(testOrderEntity);
    }

    @Test
    @Transactional
    public void updateNonExistingOrderEntity() throws Exception {
        int databaseSizeBeforeUpdate = orderEntityRepository.findAll().size();

        // Create the OrderEntity
        OrderEntityDTO orderEntityDTO = orderEntityMapper.toDto(orderEntity);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderEntityMockMvc.perform(put("/api/order-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEntityDTO)))
            .andExpect(status().isCreated());

        // Validate the OrderEntity in the database
        List<OrderEntity> orderEntityList = orderEntityRepository.findAll();
        assertThat(orderEntityList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOrderEntity() throws Exception {
        // Initialize the database
        orderEntityRepository.saveAndFlush(orderEntity);
        orderEntitySearchRepository.save(orderEntity);
        int databaseSizeBeforeDelete = orderEntityRepository.findAll().size();

        // Get the orderEntity
        restOrderEntityMockMvc.perform(delete("/api/order-entities/{id}", orderEntity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean orderEntityExistsInEs = orderEntitySearchRepository.exists(orderEntity.getId());
        assertThat(orderEntityExistsInEs).isFalse();

        // Validate the database is empty
        List<OrderEntity> orderEntityList = orderEntityRepository.findAll();
        assertThat(orderEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchOrderEntity() throws Exception {
        // Initialize the database
        orderEntityRepository.saveAndFlush(orderEntity);
        orderEntitySearchRepository.save(orderEntity);

        // Search the orderEntity
        restOrderEntityMockMvc.perform(get("/api/_search/order-entities?query=id:" + orderEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].paymentDate").value(hasItem(DEFAULT_PAYMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].dueDate").value(hasItem(DEFAULT_DUE_DATE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderEntity.class);
        OrderEntity orderEntity1 = new OrderEntity();
        orderEntity1.setId(1L);
        OrderEntity orderEntity2 = new OrderEntity();
        orderEntity2.setId(orderEntity1.getId());
        assertThat(orderEntity1).isEqualTo(orderEntity2);
        orderEntity2.setId(2L);
        assertThat(orderEntity1).isNotEqualTo(orderEntity2);
        orderEntity1.setId(null);
        assertThat(orderEntity1).isNotEqualTo(orderEntity2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderEntityDTO.class);
        OrderEntityDTO orderEntityDTO1 = new OrderEntityDTO();
        orderEntityDTO1.setId(1L);
        OrderEntityDTO orderEntityDTO2 = new OrderEntityDTO();
        assertThat(orderEntityDTO1).isNotEqualTo(orderEntityDTO2);
        orderEntityDTO2.setId(orderEntityDTO1.getId());
        assertThat(orderEntityDTO1).isEqualTo(orderEntityDTO2);
        orderEntityDTO2.setId(2L);
        assertThat(orderEntityDTO1).isNotEqualTo(orderEntityDTO2);
        orderEntityDTO1.setId(null);
        assertThat(orderEntityDTO1).isNotEqualTo(orderEntityDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(orderEntityMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(orderEntityMapper.fromId(null)).isNull();
    }
}
