package com.example.application.services.notification;

import com.example.application.repository.notification.NotificationRepository;
import com.example.application.data.notification.Notification;
import com.example.application.data.Search;
import com.example.application.data.notification.NotificationType;
import com.example.application.data.User;
import com.example.application.data.Comment;
import com.example.application.data.Artwork;
import com.example.application.data.Follower;

import reactor.core.publisher.ReplayProcessor;
import reactor.core.publisher.UnicastProcessor;
import reactor.core.publisher.Flux;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final UnicastProcessor<Notification> publisherNotif;
    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository, UnicastProcessor<Notification> publisherNotif) {
        this.notificationRepository = notificationRepository;
        this.publisherNotif = publisherNotif;
    }

    public void createNotification(User receiver, User sender, NotificationType type, Long referenceId, String action) {
    	Notification notification = new Notification(
        	receiver,   // The user who will receive the notification
        	sender,     // The user who sends the notification
        	type,       // Type of notification
        	referenceId, // Reference ID (e.g., artwork ID or search ID)
        	action // Notification message
    	);

	publisherNotif.onNext(notification);
    	notificationRepository.save(notification);
    }

    public Flux<Notification> getPublisher() {
        return publisherNotif.asFlux().share();
    }

    // Reply
    public void createReplyNotification(User sender, Comment comment) {
        createNotification(
                comment.getUser(), sender, NotificationType.REPLY, comment.getId(),
                "replied to your comment."
        );
    }

    // Follow
    public void createFollowNotification(User sender, Follower follower){
    	createNotification(
    		follower.getFollowedUser(), sender, NotificationType.FOLLOW, follower.getId(),
    		"followed you."
    	);
    }

    // Notification
    public void createReactNotification(User sender, Artwork artwork) {
    	createNotification(
    		artwork.getUser(), sender, NotificationType.REACT, artwork.getId(),
    		"reacted to your artwork."
    	);
    }

    // Comment
    public void createCommentNotification(User sender, Artwork artwork) {
    	createNotification(
    		artwork.getUser(), sender, NotificationType.COMMENT, artwork.getId(),
    		"commented on your artwork."
    	);
    }

    // Poke
    public void createPokeNotification(User sender, Search search) {
    	createNotification(
    		search.getSearchedUser(), sender, NotificationType.POKE, search.getId(),
    		"poked you."
    	);
    }

    public List<Notification> getNotificationsForUser(Long userId) {
    	return notificationRepository.findByUserId(userId);
    }

    public void markAllNotificationsAsReadForUser(Long userId) {
        notificationRepository.markAllAsReadByUserId(userId);
    }

    public List<Notification> getUnreadNotificationsForUser(Long userId){
    	return notificationRepository.findByUserIdAndNotIsRead(userId);
    }

    public void removeNotificationsByReferenceIdAndType(Long referenceId, NotificationType type){
    	notificationRepository.deleteByReferenceIdAndType(referenceId, type);
    }

    public Notification getPokeNotificationByUserAndSender(Long userId, Long senderId){
    	return notificationRepository.findByUserIdAndSenderIdAndPoke(userId, senderId);
    }

    public void updatePokeNotification(Notification notification){
    	notificationRepository.save(notification);
    }
}
