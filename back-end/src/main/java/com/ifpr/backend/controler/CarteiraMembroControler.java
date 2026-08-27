package com.ifpr.backend.controler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ifpr.backend.model.CarteiraMembro;
import com.ifpr.backend.service.CarteiraMembroService;

@RestController
@RequestMapping("/carteira-membros")
@CrossOrigin(origins = "*")
public class CarteiraMembroControler {

    @Autowired
    private CarteiraMembroService carteiraMembroService;

    @GetMapping
    public ResponseEntity<List<CarteiraMembro>> listarTodos() {
        return ResponseEntity.ok(carteiraMembroService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarteiraMembro> buscarPorId(@PathVariable Long id) {
        CarteiraMembro membro = carteiraMembroService.buscarPorId(id);

        if (membro == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(membro);
    }

    @PostMapping
    public ResponseEntity<CarteiraMembro> cadastrar(@RequestBody CarteiraMembro membro) {
        CarteiraMembro novoMembro = carteiraMembroService.cadastrar(membro);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoMembro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarteiraMembro> atualizar(@PathVariable Long id, @RequestBody CarteiraMembro membro) {
        CarteiraMembro membroAtualizado = carteiraMembroService.atualizar(id, membro);

        if (membroAtualizado == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(membroAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        boolean excluiu = carteiraMembroService.excluir(id);

        if (!excluiu) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}