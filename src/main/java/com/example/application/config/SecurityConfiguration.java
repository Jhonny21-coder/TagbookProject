package com.example.application.config;

import com.example.application.data.notification.Notification;
import com.example.application.data.ChatMessage;
import com.example.application.data.Conversation;
import com.example.application.views.chat.TypingEvent;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.http.HttpMethod;

import com.example.application.views.LoginView;
import com.vaadin.flow.spring.security.VaadinWebSecurity;
import com.vaadin.flow.component.html.Div;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import reactor.core.publisher.ReplayProcessor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.UnicastProcessor;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends VaadinWebSecurity {
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    private final String LOGIN_URL = "/login";

    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	http.authorizeHttpRequests(auth ->
            auth.requestMatchers(
             AntPathRequestMatcher.antMatcher(HttpMethod.GET, "/images/*.png")).permitAll() /*+*/
        )
        .oauth2Login(c -> c.loginPage(LOGIN_URL).permitAll()
        );
        super.configure(http);
        setLoginView(http, LoginView.class);
    }

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
    	AuthenticationManagerBuilder authenticationManagerBuilder =
            http.getSharedObject(AuthenticationManagerBuilder.class);
        return authenticationManagerBuilder.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "datiflrbo",
            "api_key", "557282944658286",
            "api_secret", "hRQa12rR4RwbtiaGJC3jqd8yDWo"
        ));
    }

    @Bean
    public UnicastProcessor<Notification> publisherNotif() {
        return UnicastProcessor.create();
    }

    @Bean
    public Flux<Notification> notifications(UnicastProcessor<Notification> publisherNotif) {
        return publisherNotif
            .replay(30)
            .autoConnect();
    }

    @Bean
    public UnicastProcessor<ChatMessage> publisherStatus() {
        return UnicastProcessor.create();
    }

    @Bean
    public Flux<ChatMessage> status(UnicastProcessor<ChatMessage> publisherStatus) {
        return publisherStatus
            .replay(30)
            .autoConnect();
    }

    @Bean
    public UnicastProcessor<ChatMessage> publisherLatest() {
        return UnicastProcessor.create();
    }

    @Bean
    public Flux<ChatMessage> latestMessages(UnicastProcessor<ChatMessage> publisherLatest) {
    	return publisherLatest
            .replay(30)
            .autoConnect();
    }

    @Bean
    public UnicastProcessor<TypingEvent> publisherTyping() {
        return UnicastProcessor.create();
    }

    @Bean
    public Flux<TypingEvent> typings(UnicastProcessor<TypingEvent> publisherTyping) {
        return publisherTyping
            .replay(30)
            .autoConnect();
    }
}
