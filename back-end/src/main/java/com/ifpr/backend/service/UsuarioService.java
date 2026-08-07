package com.ifpr.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ifpr.backend.model.Usuario;
import com.ifpr.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario cadastrar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario atualizar(Long id, Usuario usuarioAtualizado) {

        Usuario usuario = buscarPorId(id);

        if (usuario == null) {
            return null;
        }

        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setEmail(usuarioAtualizado.getEmail());
        usuario.setSenhaCriptografada(usuarioAtualizado.getSenhaCriptografada());

        return usuarioRepository.save(usuario);
    }

    public boolean excluir(Long id) {

        Usuario usuario = buscarPorId(id);

        if (usuario == null) {
            return false;
        }

        usuarioRepository.delete(usuario);

        return true;
    }
}