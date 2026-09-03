package com.ifpr.backend.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.EqualsAndHashCode;

@Entity
@Getter
@Setter
@ToString(exclude = {"categorias", "carteiras", "carteiraMembros", "transacoes", "tokens"})
@EqualsAndHashCode(exclude = {"categorias", "carteiras", "carteiraMembros", "transacoes", "tokens"})
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome obrigatório")
    @Size(min = 2, message = "O nome deve ter pelo menos 2 caracteres")
    private String nome;

    @NotBlank(message = "Email obrigatório")
    @Email(message = "Insira um email válido")
    private String email;

    @NotBlank(message = "Senha obrigatória")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String senhaCriptografada;

    private LocalDateTime criadoEm;

    private LocalDateTime atualizadoEm;

    @PrePersist
    public void prePersist() {
        this.criadoEm = LocalDateTime.now();
        this.atualizadoEm = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.atualizadoEm = LocalDateTime.now();
    }

    @JsonIgnore
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Categoria> categorias;

    @JsonIgnore
    @OneToMany(mappedBy = "dono", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Carteira> carteiras;

    @JsonIgnore
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CarteiraMembro> carteiraMembros;

    @JsonIgnore
    @OneToMany(mappedBy = "criadoPor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transacao> transacoes;

    @JsonIgnore
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Token> tokens;

    public void setCategorias(List<Categoria> categorias) {
        if (categorias != null) {
            for (Categoria categoria : categorias) {
                categoria.setUsuario(this);
            }
        }
        this.categorias = categorias;
    }

    public void setCarteiras(List<Carteira> carteiras) {
        if (carteiras != null) {
            for (Carteira carteira : carteiras) {
                carteira.setDono(this);
            }
        }
        this.carteiras = carteiras;
    }

    public void setCarteiraMembros(List<CarteiraMembro> carteiraMembros) {
        if (carteiraMembros != null) {
            for (CarteiraMembro membro : carteiraMembros) {
                membro.setUsuario(this);
            }
        }
        this.carteiraMembros = carteiraMembros;
    }

    public void setTransacoes(List<Transacao> transacoes) {
        if (transacoes != null) {
            for (Transacao transacao : transacoes) {
                transacao.setCriadoPor(this);
            }
        }
        this.transacoes = transacoes;
    }

    public void setTokens(List<Token> tokens) {
        if (tokens != null) {
            for (Token token : tokens) {
                token.setUsuario(this);
            }
        }
        this.tokens = tokens;
    }
}