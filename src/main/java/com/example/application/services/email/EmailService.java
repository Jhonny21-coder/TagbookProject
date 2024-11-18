package com.example.application.services.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmailService {
    private final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private final String EMAIL_USERNAME = "jhonleemarahay@gmail.com";
    private final String EMAIL_PASSWORD = "vxkm vbwb gjhp wpgl";

    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void sendMessageNotification(String toEmail, String senderName, String conversationName) {
    	/*// Email configuration
        String host = "smtp.gmail.com";
        Properties properties = System.getProperties();
        properties.setProperty("mail.smtp.host", host);
        properties.setProperty("mail.smtp.port", "587");
        properties.setProperty("mail.smtp.auth", "true");
        properties.setProperty("mail.smtp.starttls.enable", "true");

        // Authenticator to log in to your email account
        Authenticator authenticator = new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(EMAIL_USERNAME, EMAIL_PASSWORD);
                }
        };

        // Create a session with the email server
        Session session = Session.getDefaultInstance(properties, authenticator);*/

        try {
            String subject = senderName + " sent a message to you";
            String body = generateEmailBody(senderName, conversationName);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(body, true);  // true for HTML content

            mailSender.send(message);

            /*String body = generateEmailBody(senderName, conversationName);

            // Create a default MimeMessage object
            MimeMessage message = new MimeMessage(session);

            // Set From: header field of the header
            message.setFrom(new InternetAddress(EMAIL_USERNAME, senderName + " via Messenger"));

            // Set To: header field of the header
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));

            // Set Subject: header field
            message.setSubject(senderName + " sent a message to you");
            message.setContent(body, "text/html");

            Transport.send(message);*/

            logger.info("Sent an email to {} from {}", toEmail, senderName);
        } catch (Exception e) {
            logger.error("Failed to send email to {}: {}", toEmail, e.getMessage());
        }
    }

    private String generateEmailBody(String senderName, String conversationName) {
        return "<html>" +
               "<body style='font-family: Arial, sans-serif;'>" +
               "<div style='padding: 10px;'>" +
               "<h2>" + senderName + " sent a message to the conversation \"" + conversationName + "\"</h2>" +
               "<p>" + senderName + " sent a message to the group \"" + conversationName + "\".</p>" +
               "<p><a href='https://www.facebook.com'>View message</a></p>" +
               "<p><a href='https://www.facebook.com'>Go to profile</a></p>" +
               "</div>" +
               "<footer style='font-size: 12px; color: #888; margin-top: 20px;'>" +
               "<p>This message was sent to your email. If you don’t want to receive these emails in the future, please unsubscribe.</p>" +
               "<p>Meta Platforms, Inc., Menlo Park, CA 94025</p>" +
               "</footer>" +
               "</body>" +
               "</html>";
    }
}
