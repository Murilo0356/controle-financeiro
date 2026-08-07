package com.ifpr.backend.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Entity
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome obrigatório")
    @Size(min = 10, message = "Insira um nome completo")
    private String nome;

    @NotBlank(message = "Email obrigatório")
    @Email(message = "Insira um email válido")
    private String email;

    @NotBlank(message = "Senha obrigatória")
    private String senhaCriptografada;

    private LocalDateTime criadoEm;

    private LocalDateTime atualizadoEm;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @Setter(AccessLevel.NONE)
    private List<Categoria> categorias;

    @OneToMany(mappedBy = "dono", cascade = CascadeType.ALL, orphanRemoval = true)
    @Setter(AccessLevel.NONE)
    private List<Carteira> carteiras;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @Setter(AccessLevel.NONE)
    private List<CarteiraMembro> carteiraMembros;

    @OneToMany(mappedBy = "criadoPor", cascade = CascadeType.ALL, orphanRemoval = true)
    @Setter(AccessLevel.NONE)
    private List<Transacao> transacoes;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @Setter(AccessLevel.NONE)
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