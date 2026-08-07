package com.ifpr.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ifpr.backend.model.Token;
import com.ifpr.backend.repository.TokenRepository;

@Service
public class TokenService {

    @Autowired
    private TokenRepository tokenRepository;

    public List<Token> listarTodos() {
        return tokenRepository.findAll();
    }

    public Token buscarPorId(Long id) {
        return tokenRepository.findById(id).orElse(null);
    }

    public Token cadastrar(Token token) {
        return tokenRepository.save(token);
    }

    public Token atualizar(Long id, Token tokenAtualizado) {

        Token token = buscarPorId(id);

        if (token == null) {
            return null;
        }

        token.setToken(tokenAtualizado.getToken());
        token.setExpiraEm(tokenAtualizado.getExpiraEm());
        token.setUsuario(tokenAtualizado.getUsuario());

        return tokenRepository.save(token);
    }

    public boolean excluir(Long id) {

        Token token = buscarPorId(id);

        if (token == null) {
            return false;
        }

        tokenRepository.delete(token);

        return true;
    }

}