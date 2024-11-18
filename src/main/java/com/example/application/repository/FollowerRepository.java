package com.example.application.repository;

import com.example.application.data.User;
import com.example.application.data.Follower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface FollowerRepository extends JpaRepository<Follower, Long> {

    // Custom query to count the number of followers for a specific user
    @Query("SELECT COUNT(f) FROM Follower f WHERE f.followedUser.id = :userId AND f.isFollowed = true")
    Long countFollowersByUserId(@Param("userId") Long userId);

    @Query("SELECT c FROM Follower c " +
       "WHERE c.followedUser.id = :followedUserId " +
       "AND (LOWER(CONCAT(c.follower.firstName, ' ', c.follower.lastName)) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Follower> search(@Param("followedUserId") Long followedUserId,
                      	  @Param("searchTerm") String searchTerm);

    @Transactional
    void deleteByFollowedUserIdAndFollowerId(Long followedUserId, Long followerId);

    Follower findByFollowedUserIdAndFollowerId(Long followedUserId, Long followerId);

    List<Follower> findByFollowedUserId(Long followedUserId);

    Follower findByFollowerId(Long followerId);

    @Query("SELECT c FROM Follower c " +
       "WHERE (LOWER(CONCAT(c.follower.firstName, ' ', c.follower.lastName)) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Follower> searchFollower(@Param("searchTerm") String searchTerm);

    List<Follower> findFollowedUserByFollowerId(Long followerId);

    /*@Query("SELECT f FROM Follower f WHERE f.followedUser.id = :user_id AND isFollowed = false")
    List<Follower> findUserUnconfirmedFollowers(@Param("user_id") Long userId);*/

    @Query("SELECT f FROM Follower f WHERE f.followedUser.id = :followedUserId " +
           "AND NOT EXISTS (SELECT 1 FROM Follower f2 WHERE f2.followedUser = f.follower " +
           "AND f2.follower = f.followedUser)")
    List<Follower> findUserUnconfirmedFollowers(@Param("followedUserId") Long followedUserId);

    boolean existsByFollowerAndFollowedUser(User follower, User followedUser);
}
