package com.example.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService2 {

        private JavaMailSender mailSender;

        @Autowired
        public EmailService2(JavaMailSender mailSender) {
                this.mailSender = mailSender;
        }

        @Async
        public void sendEmail(SimpleMailMessage email) {
                mailSender.send(email);
        }
}
