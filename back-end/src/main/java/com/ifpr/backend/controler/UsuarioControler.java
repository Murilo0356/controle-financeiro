package com.ifpr.backend.controler;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ifpr.backend.model.Usuario;
import com.ifpr.backend.service.TokenService;
import com.ifpr.backend.service.UsuarioService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuarios")
public class UsuarioControler {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private TokenService tokenService; 

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    try {
        Usuario usuario = usuarioService.login(loginRequest.getEmail(), loginRequest.getSenha());
        
        String token = tokenService.gerarTokenJwt(usuario.getEmail());

        return ResponseEntity.ok(Map.of(
            "usuario", usuario,
            "token", token
        ));
    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }
}

    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        Usuario usuario = usuarioService.buscarPorId(id);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuario);
    }

    @PostMapping
    public ResponseEntity<Usuario> cadastrar(@Valid @RequestBody Usuario usuario) {
        Usuario novoUsuario = usuarioService.cadastrar(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        Usuario usuarioAtualizado = usuarioService.atualizar(id, usuario);
        if (usuarioAtualizado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuarioAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        boolean excluiu = usuarioService.excluir(id);
        if (!excluiu) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}

class LoginRequest {
    private String email;
    private String senha;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}