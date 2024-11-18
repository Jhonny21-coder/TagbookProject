package com.example.application.views.chat;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.router.Route;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Timer;
import java.util.TimerTask;

public class VisualTimer extends Div {

    private Span timerDisplay;
    private LocalDateTime muteEndTime;
    private Timer timer;

    public VisualTimer(LocalDateTime muteStartTime, Duration muteDuration) {
        this.muteEndTime = muteStartTime.plus(muteDuration);
        this.timerDisplay = new Span();
        //this.timerDisplay.getStyle().set("font-size", "1.5em"); // Set display size if needed

        add(timerDisplay);

        startTimer();
    }

    private void startTimer() {
        timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                getUI().ifPresent(ui -> ui.access(() -> updateTimer()));
            }
        }, 0, 1000); // Update every second
    }

    private void updateTimer() {
        Duration remainingTime = Duration.between(LocalDateTime.now(), muteEndTime);

        if (!remainingTime.isNegative()) {
            // Format the remaining time as HH:MM:SS
            long hours = remainingTime.toHours();
            long minutes = remainingTime.minusHours(hours).toMinutes();
            long seconds = remainingTime.minusHours(hours).minusMinutes(minutes).getSeconds();
            timerDisplay.setText(String.format("%02d:%02d:%02d", hours, minutes, seconds));
        } else {
            //timerDisplay.setText("Unmuted"); // Display message when timer expires
            timerDisplay.setVisible(false);
            stopTimer();
        }
    }

    public void stopTimer() {
        if (timer != null) {
            timer.cancel();
        }
    }

    // Optional: reset or reinitialize the timer with a new duration
    public void reset(LocalDateTime newMuteStartTime, Duration newMuteDuration) {
        this.muteEndTime = newMuteStartTime.plus(newMuteDuration);
        startTimer();
    }
}
