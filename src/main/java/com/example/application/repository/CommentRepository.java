package com.example.application.repository;

import com.example.application.data.Comment;
import com.example.application.data.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    int countByUser(User user);
    int countByArtworkId(Long artworkId);

    List<Comment> findByUserId(Long userId);
    List<Comment> findByArtworkId(Long artworkId);

    /*@Query("SELECT c.id FROM Comment c WHERE c.artwork.id = :artworkId")
    List<Long> findCommentsForMainFeed(@Param("artworkId") Long artworkId);*/

    Page<Comment> findByArtworkId(Long artworkId, Pageable pageable);

    Comment findCommentByUserId(Long userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Comment c WHERE c.artwork.id = :artworkId")
    void deleteByArtworkId(@Param("artworkId") Long artworkId);
}
