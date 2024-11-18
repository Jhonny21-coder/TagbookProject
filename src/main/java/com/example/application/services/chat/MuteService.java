package com.example.application.services.chat;

import com.example.application.repository.ConversationRepository;
import com.example.application.data.User;
import com.example.application.data.Conversation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
@EnableScheduling
public class MuteService {
    @Autowired
    private ConversationRepository conversationRepository;

    // Enum for predefined mute durations
    public enum MuteDuration {
    	FIFTEEN_MINUTES(Duration.ofMinutes(15)),
    	ONE_HOUR(Duration.ofHours(1)),
    	EIGHT_HOURS(Duration.ofHours(8)),
    	TWENTY_FOUR_HOURS(Duration.ofHours(24)),
    	PERMANENT(Duration.ofDays(365 * 100)), // Effectively permanent
    	CUSTOM(null); // Placeholder for custom duration

    	private final Duration defaultDuration;
    	private static Duration customDuration; // Holds the custom duration value

    	MuteDuration(Duration defaultDuration) {
            this.defaultDuration = defaultDuration;
    	}

    	public Duration getDuration() {
            if (this == CUSTOM) {
            	return customDuration != null ? customDuration : Duration.ZERO; // Return custom duration or 0 if not set
            }
            return defaultDuration;
    	}

    	public static void setCustomDuration(Duration duration) {
            customDuration = duration;
    	}
    }

    public void muteConversation(Long conversationId, User user, MuteDuration duration) {
        Conversation conversation = conversationRepository.findById(conversationId).orElseThrow();
        conversation.setMute(user, duration.getDuration());
        conversationRepository.save(conversation);
    }

    public void unmuteConversation(Long conversationId, User user) {
        Conversation conversation = conversationRepository.findById(conversationId).orElseThrow();
        conversation.unmute(user);
        conversationRepository.save(conversation);
    }

    public boolean isConversationMuted(Long conversationId, User user) {
        Conversation conversation = conversationRepository.findById(conversationId).orElseThrow();
        return conversation.isMuted(user);
    }

    // Scheduled task to unmute conversations with expired mute durations
    @Scheduled(fixedRate = 60000)  // Run every minute to check mute status
    public void unmuteExpiredConversations() {
    	int pageNumber = 0;
    	Page<Conversation> page;

    	do {
            Pageable pageable = PageRequest.of(pageNumber, 100); // Fetch 100 conversations per page
            page = conversationRepository.findExpiredMutes(pageable);

            for (Conversation conversation : page.getContent()) {
            	checkAndUnmute(conversation, conversation.getUser1());
            	checkAndUnmute(conversation, conversation.getUser2());
            }

            conversationRepository.saveAll(page.getContent()); // Save any updates
            pageNumber++;
    	} while (page.hasNext());
    }

    // Helper to check and unmute each user if their mute period has expired
    private void checkAndUnmute(Conversation conversation, User user) {
    	LocalDateTime muteEndTime = getMuteEndTime(conversation, user);
    	if (muteEndTime != null && muteEndTime.isBefore(LocalDateTime.now())) {
            conversation.unmute(user);
    	}
    }

    // Method to calculate the end time for mute based on stored duration and start time
    private LocalDateTime getMuteEndTime(Conversation conversation, User user) {
    	if (user.equals(conversation.getUser1()) && conversation.getMuteStartTimeUser1() != null) {
            return conversation.getMuteStartTimeUser1().plus(conversation.getMuteDurationUser1());
    	} else if (user.equals(conversation.getUser2()) && conversation.getMuteStartTimeUser2() != null) {
            return conversation.getMuteStartTimeUser2().plus(conversation.getMuteDurationUser2());
    	}
    	return null; // User is not muted
    }
}

