package com.ifpr.backend.service;


import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ifpr.backend.model.Perfil;
import com.ifpr.backend.repository.PerfilRepository;

@Service
public class PerfilService {
    
    @Autowired
    private PerfilRepository repository;

    public Perfil inserir(Perfil perfil){
        return repository.save(perfil);
    }

    public List<Perfil> listaPerfil(){
        return repository.findAll();
    }

    public Perfil buscarPorUUID(UUID id){
        Perfil perfil = repository.findById(id).orElseThrow(() -> new RuntimeException("Perfil inexistente"));
        return perfil;
    }

    public void remover(UUID id){
        Perfil perfil = buscarPorUUID(id);
        repository.delete(perfil);
        
    }
    
    public Perfil alterar(Perfil perfil) {
        Perfil perfilDB = buscarPorUUID(perfil.getId());

        perfilDB.setDescricao(perfil.getDescricao());

        return repository.save(perfilDB);
    }
}
