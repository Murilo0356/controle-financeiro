package com.ifpr.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ifpr.backend.model.CarteiraMembro;
import com.ifpr.backend.repository.CarteiraMembroRepository;

@Service
public class CarteiraMembroService {

    @Autowired
    private CarteiraMembroRepository carteiraMembroRepository;

    public List<CarteiraMembro> listarTodos() {
        return carteiraMembroRepository.findAll();
    }

    public CarteiraMembro buscarPorId(Long id) {
        return carteiraMembroRepository.findById(id).orElse(null);
    }

    public CarteiraMembro cadastrar(CarteiraMembro membro) {
        return carteiraMembroRepository.save(membro);
    }

    public CarteiraMembro atualizar(Long id, CarteiraMembro membroAtualizado) {

        CarteiraMembro membro = buscarPorId(id);

        if (membro == null) {
            return null;
        }

        membro.setCarteira(membroAtualizado.getCarteira());
        membro.setUsuario(membroAtualizado.getUsuario());

        return carteiraMembroRepository.save(membro);
    }

    public boolean excluir(Long id) {

        CarteiraMembro membro = buscarPorId(id);

        if (membro == null) {
            return false;
        }

        carteiraMembroRepository.delete(membro);

        return true;
    }

}
