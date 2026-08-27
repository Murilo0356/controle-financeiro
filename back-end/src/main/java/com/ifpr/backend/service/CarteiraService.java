package com.ifpr.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ifpr.backend.model.Carteira;
import com.ifpr.backend.model.Usuario;
import com.ifpr.backend.repository.CarteiraRepository;
import com.ifpr.backend.repository.UsuarioRepository;

@Service
public class CarteiraService {

    @Autowired
    private CarteiraRepository carteiraRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Carteira> listarTodas() {
        return carteiraRepository.findAll();
    }

    public Carteira buscarPorId(Long id) {
        return carteiraRepository.findById(id).orElse(null);
    }

    public Carteira cadastrar(Carteira carteira) {
        if (carteira.getDono() == null || carteira.getDono().getId() == null) {
            Usuario usuarioPadrao = usuarioRepository.findAll().stream().findFirst().orElseThrow(
                () -> new RuntimeException("Nenhum usuário encontrado no sistema")
            );
            carteira.setDono(usuarioPadrao);
        } else {
            Usuario donoPersistido = usuarioRepository.findById(carteira.getDono().getId()).orElseThrow(
                () -> new RuntimeException("Usuário informado não existe")
            );
            carteira.setDono(donoPersistido);
        }
        
        return carteiraRepository.save(carteira);
    }

    public Carteira atualizar(Long id, Carteira carteiraAtualizada) {
        Carteira carteira = buscarPorId(id);

        if (carteira == null) {
            return null;
        }

        carteira.setNome(carteiraAtualizada.getNome());
        carteira.setDescricao(carteiraAtualizada.getDescricao());
        if (carteiraAtualizada.getSaldo() != null) {
            carteira.setSaldo(carteiraAtualizada.getSaldo());
        }

        return carteiraRepository.save(carteira);
    }

    public boolean excluir(Long id) {
        Carteira carteira = buscarPorId(id);

        if (carteira == null) {
            return false;
        }

        carteiraRepository.delete(carteira);
        return true;
    }
}