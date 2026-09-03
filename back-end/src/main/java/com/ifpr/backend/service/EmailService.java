package com.ifpr.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarEmailRecuperacao(String para, String token) {
        String urlRedefinicao = "http://localhost:3000/redefinir-senha?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(para);
        message.setSubject("Recuperação de Senha - Controle Financeiro");
        message.setText("Olá,\n\nVocê solicitou a redefinição de sua senha. Clique no link abaixo para criar uma nova senha:\n\n"
                + urlRedefinicao + "\n\nEste link expira em 30 minutos.\nSe você não solicitou isso, ignore este e-mail.");

        mailSender.send(message);
    }
}