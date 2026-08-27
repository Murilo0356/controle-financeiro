package com.ifpr.backend.model;

import java.time.LocalDateTime;

import com.ifpr.backend.enums.PapelCarteira;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;

@Entity
@Data
@Table(
    uniqueConstraints = @UniqueConstraint(columnNames = {"carteira_id", "usuario_id"})
)
public class CarteiraMembro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Carteira carteira;

    @ManyToOne(optional = false)
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    private PapelCarteira papel;

    private LocalDateTime entradoEm;

    @PrePersist
    public void prePersist() {
        this.entradoEm = LocalDateTime.now();
    }
}