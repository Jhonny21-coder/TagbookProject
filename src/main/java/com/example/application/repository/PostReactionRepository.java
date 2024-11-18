package com.example.application.repository;

import com.example.application.data.dto.post.PostReactionDTO;
import com.example.application.data.PostReaction;
import com.example.application.data.User;
import com.example.application.data.Artwork;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.List;

public interface PostReactionRepository extends JpaRepository<PostReaction, Long> {

    @Query("""
    	SELECT new com.example.application.data.dto.post.PostReactionDTO(
    	    p.reactType
    	)
    	FROM PostReaction p
    	WHERE p.artwork.id = :artworkId
    """)
    List<PostReactionDTO> findReactionsByArtworkId(Long artworkId);

    @Query("""
    	SELECT new com.example.application.data.dto.post.PostReactionDTO(
            p.reactType
        )
        FROM PostReaction p
        WHERE p.artwork.id = :artworkId AND p.reactor.id = :reactorId
    """)
    PostReactionDTO findByArtworkIdAndReactorId(Long artworkId, Long reactorId);

    List<PostReaction> findByArtworkId(Long artworkId);
    PostReaction findByReactorIdAndArtworkId(Long reactorId, Long artworkId);
    PostReaction findByArtwork(Artwork artwork);

    @Modifying
    @Transactional
    @Query("DELETE FROM PostReaction p WHERE p.artwork.id = :artworkId")
    void deleteByArtworkId(@Param("artworkId") Long artworkId);

    Long countByArtworkId(Long artworkId);
}
