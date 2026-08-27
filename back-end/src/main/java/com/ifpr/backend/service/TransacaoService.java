package com.ifpr.backend.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ifpr.backend.enums.TipoTransacao;
import com.ifpr.backend.model.Carteira;
import com.ifpr.backend.model.Categoria;
import com.ifpr.backend.model.Transacao;
import com.ifpr.backend.model.Usuario;
import com.ifpr.backend.repository.CarteiraRepository;
import com.ifpr.backend.repository.CategoriaRepository;
import com.ifpr.backend.repository.TransacaoRepository;
import com.ifpr.backend.repository.UsuarioRepository;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository transacaoRepository;

    @Autowired
    private CarteiraRepository carteiraRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Transacao> listarTodos() {
        return transacaoRepository.findAll();
    }

    public Transacao buscarPorId(Long id) {
        return transacaoRepository.findById(id).orElse(null);
    }

    @Transactional
    public Transacao cadastrar(Transacao transacao) {
        if (transacao.getCarteira() == null || transacao.getCarteira().getId() == null) {
            Carteira carteiraPadrao = carteiraRepository.findAll().stream().findFirst().orElseThrow(
                () -> new RuntimeException("Nenhuma carteira cadastrada")
            );
            transacao.setCarteira(carteiraPadrao);
        } else {
            Carteira carteiraPersistida = carteiraRepository.findById(transacao.getCarteira().getId()).orElseThrow(
                () -> new RuntimeException("Carteira não encontrada")
            );
            transacao.setCarteira(carteiraPersistida);
        }

        if (transacao.getCategoria() != null && transacao.getCategoria().getId() != null) {
            Categoria categoriaPersistida = categoriaRepository.findById(transacao.getCategoria().getId()).orElse(null);
            transacao.setCategoria(categoriaPersistida);
        }

        if (transacao.getCriadoPor() == null || transacao.getCriadoPor().getId() == null) {
            Usuario usuarioPadrao = usuarioRepository.findAll().stream().findFirst().orElseThrow(
                () -> new RuntimeException("Nenhum usuário cadastrado")
            );
            transacao.setCriadoPor(usuarioPadrao);
        } else {
            Usuario usuarioPersistido = usuarioRepository.findById(transacao.getCriadoPor().getId()).orElseThrow(
                () -> new RuntimeException("Usuário não encontrado")
            );
            transacao.setCriadoPor(usuarioPersistido);
        }

        Carteira carteira = transacao.getCarteira();
        Double saldoAtual = carteira.getSaldo() != null ? carteira.getSaldo() : 0.0;
        BigDecimal valorTransacao = transacao.getValor();

        if (transacao.getTipo() == TipoTransacao.RECEITA) {
            carteira.setSaldo(saldoAtual + valorTransacao.doubleValue());
        } else if (transacao.getTipo() == TipoTransacao.DESPESA) {
            carteira.setSaldo(saldoAtual - valorTransacao.doubleValue());
        }

        carteiraRepository.save(carteira);

        return transacaoRepository.save(transacao);
    }

    @Transactional
    public Transacao atualizar(Long id, Transacao transacaoAtualizada) {
        Transacao transacao = buscarPorId(id);

        if (transacao == null) {
            return null;
        }

        transacao.setDescricao(transacaoAtualizada.getDescricao());
        if (transacaoAtualizada.getValor() != null) {
            transacao.setValor(transacaoAtualizada.getValor());
        }
        if (transacaoAtualizada.getData() != null) {
            transacao.setData(transacaoAtualizada.getData());
        }
        if (transacaoAtualizada.getTipo() != null) {
            transacao.setTipo(transacaoAtualizada.getTipo());
        }
        if (transacaoAtualizada.getCarteira() != null && transacaoAtualizada.getCarteira().getId() != null) {
            Carteira carteira = carteiraRepository.findById(transacaoAtualizada.getCarteira().getId()).orElse(null);
            if (carteira != null) {
                transacao.setCarteira(carteira);
            }
        }
        if (transacaoAtualizada.getCategoria() != null && transacaoAtualizada.getCategoria().getId() != null) {
            Categoria categoria = categoriaRepository.findById(transacaoAtualizada.getCategoria().getId()).orElse(null);
            transacao.setCategoria(categoria);
        }

        return transacaoRepository.save(transacao);
    }

    @Transactional
    public boolean excluir(Long id) {
        Transacao transacao = buscarPorId(id);

        if (transacao == null) {
            return false;
        }

        Carteira carteira = transacao.getCarteira();
        if (carteira != null && transacao.getValor() != null) {
            Double saldoAtual = carteira.getSaldo() != null ? carteira.getSaldo() : 0.0;
            BigDecimal valor = transacao.getValor();

            if (transacao.getTipo() == TipoTransacao.RECEITA) {
                carteira.setSaldo(saldoAtual - valor.doubleValue());
            } else if (transacao.getTipo() == TipoTransacao.DESPESA) {
                carteira.setSaldo(saldoAtual + valor.doubleValue());
            }
            carteiraRepository.save(carteira);
        }

        transacaoRepository.delete(transacao);
        return true;
    }
}