package com.ifpr.backend.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
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
public class Carteira {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Usuario dono;

    @NotBlank(message = "Nome da carteira obrigatório")
    private String nome;

    private String descricao;

    private LocalDateTime criadoEm;

    @OneToMany(mappedBy = "carteira", cascade = CascadeType.ALL, orphanRemoval = true)
    @Setter(AccessLevel.NONE)
    private List<CarteiraMembro> membros;

    @OneToMany(mappedBy = "carteira", cascade = CascadeType.ALL, orphanRemoval = true)
    @Setter(AccessLevel.NONE)
    private List<Transacao> transacoes;

    public void setMembros(List<CarteiraMembro> membros) {
        if (membros != null) {
            for (CarteiraMembro membro : membros) {
                membro.setCarteira(this);
            }
        }
        this.membros = membros;
    }

    public void setTransacoes(List<Transacao> transacoes) {
        if (transacoes != null) {
            for (Transacao transacao : transacoes) {
                transacao.setCarteira(this);
            }
        }
        this.transacoes = transacoes;
    }
}