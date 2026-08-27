package com.ifpr.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ifpr.backend.model.Categoria;
import com.ifpr.backend.model.Usuario;
import com.ifpr.backend.repository.CategoriaRepository;
import com.ifpr.backend.repository.UsuarioRepository;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Categoria> listarTodos() {
        return categoriaRepository.findAll();
    }

    public Categoria buscarPorId(Long id) {
        return categoriaRepository.findById(id).orElse(null);
    }

    public Categoria cadastrar(Categoria categoria) {
        if (categoria.getUsuario() == null || categoria.getUsuario().getId() == null) {
            Usuario usuarioPadrao = usuarioRepository.findAll().stream().findFirst().orElse(null);
            categoria.setUsuario(usuarioPadrao);
        }
        return categoriaRepository.save(categoria);
    }

    public Categoria atualizar(Long id, Categoria categoriaAtualizada) {
        Categoria categoria = buscarPorId(id);

        if (categoria == null) {
            return null;
        }

        categoria.setNome(categoriaAtualizada.getNome());
        categoria.setTipo(categoriaAtualizada.getTipo());
        categoria.setCor(categoriaAtualizada.getCor());
        categoria.setIcone(categoriaAtualizada.getIcone());
        
        if (categoriaAtualizada.getUsuario() != null) {
            categoria.setUsuario(categoriaAtualizada.getUsuario());
        }

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