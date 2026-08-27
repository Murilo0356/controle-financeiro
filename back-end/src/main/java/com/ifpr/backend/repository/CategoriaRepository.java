package com.ifpr.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List; 
import com.ifpr.backend.model.Categoria;
import com.ifpr.backend.model.Usuario;
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
List<Categoria> findByUsuario(Usuario usuario);
}