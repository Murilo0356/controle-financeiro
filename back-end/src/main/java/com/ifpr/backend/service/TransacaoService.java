package com.ifpr.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ifpr.backend.model.Transacao;
import com.ifpr.backend.repository.TransacaoRepository;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository transacaoRepository;

    public List<Transacao> listarTodos() {
        return transacaoRepository.findAll();
    }

    public Transacao buscarPorId(Long id) {
        return transacaoRepository.findById(id).orElse(null);
    }

    public Transacao cadastrar(Transacao transacao) {
        return transacaoRepository.save(transacao);
    }

    public Transacao atualizar(Long id, Transacao transacaoAtualizada) {

        Transacao transacao = buscarPorId(id);

        if (transacao == null) {
            return null;
        }

        transacao.setDescricao(transacaoAtualizada.getDescricao());
        transacao.setValor(transacaoAtualizada.getValor());
        transacao.setData(transacaoAtualizada.getData());
        transacao.setTipo(transacaoAtualizada.getTipo());
        transacao.setCarteira(transacaoAtualizada.getCarteira());
        transacao.setCategoria(transacaoAtualizada.getCategoria());
        transacao.setCriadoPor(transacaoAtualizada.getCriadoPor());

        return transacaoRepository.save(transacao);
    }

    public boolean excluir(Long id) {

        Transacao transacao = buscarPorId(id);

        if (transacao == null) {
            return false;
        }

        transacaoRepository.delete(transacao);

        return true;
    }

}