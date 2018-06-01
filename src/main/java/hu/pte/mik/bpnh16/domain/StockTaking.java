package hu.pte.mik.bpnh16.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A StockTaking.
 */
@Entity
@Table(name = "stock_taking")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "stocktaking")
public class StockTaking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "stock_taking_date", nullable = false)
    private LocalDate stockTakingDate;

    @ManyToOne
    private Status status;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStockTakingDate() {
        return stockTakingDate;
    }

    public StockTaking stockTakingDate(LocalDate stockTakingDate) {
        this.stockTakingDate = stockTakingDate;
        return this;
    }

    public void setStockTakingDate(LocalDate stockTakingDate) {
        this.stockTakingDate = stockTakingDate;
    }

    public Status getStatus() {
        return status;
    }

    public StockTaking status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        StockTaking stockTaking = (StockTaking) o;
        if (stockTaking.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stockTaking.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StockTaking{" +
            "id=" + getId() +
            ", stockTakingDate='" + getStockTakingDate() + "'" +
            "}";
    }
}
