package com.example.application.repository;

import com.example.application.data.dto.post.ArtworkFeedDTO;
import com.example.application.data.Artwork;
import com.example.application.data.StudentInfo;
import com.example.application.data.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ArtworkRepository extends JpaRepository<Artwork, Long> {
     @Query("""
    	SELECT
            new com.example.application.data.dto.post.ArtworkFeedDTO(
            	a.id,
            	a.description,
            	a.background,
            	a.postTimestamp,
            	u.id,
            	CONCAT(u.firstName, ' ', u.lastName),
            	u.profileImage,
            	a.artworkUrl,
            	(SELECT COUNT(c) FROM Comment c WHERE c.artwork.id = a.id)
            )
    	FROM Artwork a
    	JOIN a.user u
    	ORDER BY a.postTimestamp DESC
    """)
    Page<ArtworkFeedDTO> findAllArtworkFeedDTOs(Pageable pageable);

    @Query("""
        SELECT
            new com.example.application.data.dto.post.ArtworkFeedDTO(
                a.id,
                a.description,
                a.background,
                a.postTimestamp,
                u.id,
                CONCAT(u.firstName, ' ', u.lastName),
                u.profileImage,
                a.artworkUrl,
                (SELECT COUNT(c) FROM Comment c WHERE c.artwork.id = a.id)
            )
        FROM Artwork a
        JOIN a.user u
        WHERE a.user = :user
        ORDER BY a.postTimestamp DESC
    """)
    Page<ArtworkFeedDTO> findUserArtworkDTOs(User user, Pageable pageable);

    int countByStudentInfoUser(User user);

    List<Artwork> findByUserId(Long userId);

    @Query("SELECT c FROM Artwork c " +
       "WHERE c.user.id = :userId AND (LOWER(c.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Artwork> search(@Param("searchTerm") String searchTerm,
    			 @Param("userId") Long userId);
}
