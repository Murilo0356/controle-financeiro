package com.ifpr.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ifpr.backend.model.Token;
import com.ifpr.backend.model.Usuario;

public interface TokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByToken(String token);

    Optional<Token> findByUsuarioAndUtilizadoFalse(Usuario usuario);
}