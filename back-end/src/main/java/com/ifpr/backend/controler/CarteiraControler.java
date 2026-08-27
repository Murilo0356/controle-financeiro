package com.ifpr.backend.controler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ifpr.backend.model.Carteira;
import com.ifpr.backend.service.CarteiraService;

@RestController
@RequestMapping("/carteiras")
@CrossOrigin(origins = "*")
public class CarteiraControler {

    @Autowired
    private CarteiraService carteiraService;

    @GetMapping
    public ResponseEntity<List<Carteira>> listarTodas() {
        return ResponseEntity.ok(carteiraService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Carteira> buscarPorId(@PathVariable Long id) {
        Carteira carteira = carteiraService.buscarPorId(id);

        if (carteira == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(carteira);
    }

    @PostMapping
    public ResponseEntity<Carteira> cadastrar(@RequestBody Carteira carteira) {
        Carteira novaCarteira = carteiraService.cadastrar(carteira);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaCarteira);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Carteira> atualizar(@PathVariable Long id, @RequestBody Carteira carteira) {
        Carteira carteiraAtualizada = carteiraService.atualizar(id, carteira);

        if (carteiraAtualizada == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(carteiraAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        boolean excluiu = carteiraService.excluir(id);

        if (!excluiu) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}