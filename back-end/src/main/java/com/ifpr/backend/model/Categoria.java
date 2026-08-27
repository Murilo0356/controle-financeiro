package com.ifpr.backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ifpr.backend.enums.TipoTransacao;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Entity
@Data
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Usuario usuario;

    @NotBlank(message = "Nome obrigatório")
    private String nome;

    @Enumerated(EnumType.STRING)
    private TipoTransacao tipo;

    private String cor;

    private String icone;

    @JsonIgnore
    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL, orphanRemoval = true)
    @Setter(AccessLevel.NONE)
    private List<Transacao> transacoes;

    public void setTransacoes(List<Transacao> transacoes) {
        if (transacoes != null) {
            for (Transacao transacao : transacoes) {
                transacao.setCategoria(this);
            }
        }
        this.transacoes = transacoes;
    }
}