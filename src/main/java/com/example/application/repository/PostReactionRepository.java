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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.List;

public interface PostReactionRepository extends JpaRepository<PostReaction, Long> {
    @Query("""
        SELECT new com.example.application.data.dto.post.PostReactionDTO(
            r.reactType
        )
        FROM PostReaction r
        WHERE r.artwork.id = :artworkId
        GROUP BY r.reactType
        ORDER BY COUNT(r) DESC
    """)
    Page<PostReactionDTO> findTopReactionsByArtworkId(@Param("artworkId") Long artworkId, Pageable pageable);

    // Fetch grouped PostReaction counts
    @Query("""
    	SELECT r.reactType AS reactType, COUNT(r) AS count
        FROM PostReaction r
        WHERE r.artwork.id = :artworkId
        GROUP BY r.reactType
    """)
    List<ReactionCount> findReactionCountsByArtworkId(@Param("artworkId") Long artworkId);

    // Fetch paginated PostReaction by artwork id
    Page<PostReaction> findByArtworkId(Long artworkId, Pageable pageable);

    // Fetch paginated PostReaction by artwork id and react type
    Page<PostReaction> findByArtworkIdAndReactType(Long artworkId, String reactType, Pageable pageable);

    /*// Fetch react type, profile image and full name by artwork id
    @Query("""
    	SELECT new com.example.application.data.dto.post.PostReactionDTO(
            p.reactType,
            p.reactor.profileImage,
            CONCAT(p.reactor.firstName, ' ', p.reactor.lastName)
    	)
    	FROM PostReaction p
    	WHERE p.artwork.id = :artworkId
    	ORDER BY p.id
    """)
    Page<PostReactionDTO> findReactionDTOsByArtworkId(@Param("artworkId") Long artworkId, Pageable pageable);*/

    // Fetch react type by artwork id
    @Query("""
    	SELECT new com.example.application.data.dto.post.PostReactionDTO(
    	    p.reactType
    	)
    	FROM PostReaction p
    	WHERE p.artwork.id = :artworkId
    """)
    List<PostReactionDTO> findReactionsByArtworkId(Long artworkId);

    // Fetch react type by reactor id and artwork id
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
