package com.ifpr.backend.controler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ifpr.backend.model.Transacao;
import com.ifpr.backend.service.TransacaoService;

@RestController
@RequestMapping("/transacoes")
@CrossOrigin(origins = "*")
public class TransacaoControler {

    @Autowired
    private TransacaoService transacaoService;

    @GetMapping
    public ResponseEntity<List<Transacao>> listarTodos() {
        return ResponseEntity.ok(transacaoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transacao> buscarPorId(@PathVariable Long id) {
        Transacao transacao = transacaoService.buscarPorId(id);

        if (transacao == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(transacao);
    }

    @PostMapping
    public ResponseEntity<Transacao> cadastrar(@RequestBody Transacao transacao) {
        Transacao novaTransacao = transacaoService.cadastrar(transacao);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaTransacao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transacao> atualizar(@PathVariable Long id, @RequestBody Transacao transacao) {
        Transacao transacaoAtualizada = transacaoService.atualizar(id, transacao);

        if (transacaoAtualizada == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(transacaoAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        boolean excluiu = transacaoService.excluir(id);

        if (!excluiu) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}