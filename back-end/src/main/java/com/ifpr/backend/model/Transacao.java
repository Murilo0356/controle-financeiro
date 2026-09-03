package com.ifpr.backend.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ifpr.backend.enums.TipoTransacao;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.EqualsAndHashCode;

@Entity
@Getter
@Setter
@ToString(exclude = {"carteira", "categoria", "criadoPor"})
@EqualsAndHashCode(exclude = {"carteira", "categoria", "criadoPor"})
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JsonIgnoreProperties({"transacoes", "usuario", "criadoEm", "hibernateLazyInitializer", "handler"})
    private Carteira carteira;

    @ManyToOne
    @JsonIgnoreProperties({"transacoes", "hibernateLazyInitializer", "handler"})
    private Categoria categoria;

    @ManyToOne(optional = false)
    @JsonIgnoreProperties({"transacoes", "senhaCriptografada", "senha", "hibernateLazyInitializer", "handler"})
    private Usuario criadoPor;

    @NotNull(message = "Tipo obrigatório")
    @Enumerated(EnumType.STRING)
    private TipoTransacao tipo;

    @NotNull(message = "Valor obrigatório")
    @DecimalMin(value = "0.01", message = "O valor deve ser maior que zero")
    private BigDecimal valor;

    private String descricao;

    @NotNull(message = "Data obrigatória")
    private LocalDate data;

    private LocalDateTime criadoEm;

    @PrePersist
    public void prePersist() {
        this.criadoEm = LocalDateTime.now();
    }
}