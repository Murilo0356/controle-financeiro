package com.ifpr.backend.service;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ifpr.backend.model.Usuario;
import com.ifpr.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario cadastrar(Usuario usuario) {

        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new IllegalArgumentException("E-mail já cadastrado.");
        }

        String senhaHash = passwordEncoder.encode(
            usuario.getSenhaCriptografada()
        );

        usuario.setSenhaCriptografada(senhaHash);

        return usuarioRepository.save(usuario);
    }

    public Usuario login(String email, String senha) {

        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() ->
                new IllegalArgumentException("E-mail ou senha inválidos.")
            );

        if (!passwordEncoder.matches(
                senha,
                usuario.getSenhaCriptografada()
        )) {
            throw new IllegalArgumentException("E-mail ou senha inválidos.");
        }

        return usuario;
    }

    public Usuario atualizar(Long id, Usuario usuarioAtualizado) {

        Usuario usuario = buscarPorId(id);

        if (usuario == null) {
            return null;
        }

        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setEmail(usuarioAtualizado.getEmail());

        if (usuarioAtualizado.getSenhaCriptografada() != null
                && !usuarioAtualizado.getSenhaCriptografada().isBlank()) {

            usuario.setSenhaCriptografada(
                passwordEncoder.encode(
                    usuarioAtualizado.getSenhaCriptografada()
                )
            );
        }

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