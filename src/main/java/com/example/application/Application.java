package com.example.application;

import com.example.application.data.ChatMessage;
import com.example.application.views.MainFeed;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.theme.Theme;
import com.vaadin.flow.theme.lumo.Lumo;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.component.page.Push;

import org.springframework.context.annotation.Bean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableScheduling;

import reactor.core.publisher.Flux;
import reactor.core.publisher.UnicastProcessor;

/*import com.vaadin.flow.server.VaadinServiceInitListener;
import com.vaadin.flow.internal.nodefeature.LoadingIndicatorConfigurationMap;
import com.vaadin.flow.server.ServiceInitEvent;*/

@Push
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EnableScheduling
@Theme(value = "flowcrmtutorial", variant = Lumo.DARK)
@PWA(
    name = "The Animation Guild",
    shortName = "TAG",
    offlinePath = "offline.html",
    offlineResources = { "./images/offline.png" }
)
public class Application extends SpringBootServletInitializer implements AppShellConfigurator/*, VaadinServiceInitListener*/ {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public UnicastProcessor<ChatMessage> publisher() {
        return UnicastProcessor.create();
    }

    @Bean
    public Flux<ChatMessage> messages(UnicastProcessor<ChatMessage> publisher) {
        return publisher
            .replay(30)
            .autoConnect();
    }

    /*@Override
    public void serviceInit(ServiceInitEvent serviceInitEvent) {
        serviceInitEvent.getSource().addUIInitListener(uiInitEvent -> {
            uiInitEvent.getUI().addBeforeEnterListener(event -> {
                LoadingIndicatorConfigurationMap conf =
                    (LoadingIndicatorConfigurationMap) uiInitEvent.getUI().getLoadingIndicatorConfiguration();

                if (event.getNavigationTarget().equals(MainFeed.class)) {
                    conf.setApplyDefaultTheme(false); // Disable loading indicator
                } else {
                    conf.setApplyDefaultTheme(true); // Enable loading indicator
                }
            });
        });
    }*/
}
