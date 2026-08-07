package com.ifpr.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ifpr.backend.model.Categoria;
import com.ifpr.backend.repository.CategoriaRepository;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> listarTodos() {
        return categoriaRepository.findAll();
    }

    public Categoria buscarPorId(Long id) {
        return categoriaRepository.findById(id).orElse(null);
    }

    public Categoria cadastrar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public Categoria atualizar(Long id, Categoria categoriaAtualizada) {

        Categoria categoria = buscarPorId(id);

        if (categoria == null) {
            return null;
        }

        categoria.setNome(categoriaAtualizada.getNome());
        categoria.setCor(categoriaAtualizada.getCor());
        categoria.setUsuario(categoriaAtualizada.getUsuario());

        return categoriaRepository.save(categoria);
    }

    public boolean excluir(Long id) {

        Categoria categoria = buscarPorId(id);

        if (categoria == null) {
            return false;
        }

        categoriaRepository.delete(categoria);

        return true;
    }

}