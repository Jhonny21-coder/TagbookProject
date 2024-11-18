package com.example.application.services;

import com.example.application.data.Artwork;
import com.example.application.data.User;
import com.example.application.repository.UserRepository;
import com.example.application.repository.ArtworkRepository;
import com.example.application.data.StudentInfo;
import com.example.application.repository.StudentInfoRepository;
import com.example.application.data.dto.post.ArtworkFeedDTO;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;
import java.util.Collections;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

@Service
public class ArtworkService {

    private final ArtworkRepository artworkRepository;
    private final UserRepository userRepository;
    private final StudentInfoRepository studentInfoRepository;

    public ArtworkService(ArtworkRepository artworkRepository, StudentInfoRepository studentInfoRepository,
			UserRepository userRepository){
        this.artworkRepository = artworkRepository;
	this.studentInfoRepository = studentInfoRepository;
	this.userRepository = userRepository;
    }

    public void savePost(String email, String description, String background){
    	User user = userRepository.findByEmail(email);

        LocalDateTime timestamp = LocalDateTime.now(ZoneId.of("Asia/Manila"));

        if (user != null) {
            Artwork artwork = new Artwork();
            artwork.setUser(user);
            artwork.setDescription(description);
            artwork.setPostTimestamp(timestamp);
            artwork.setBackground(background);

            artworkRepository.save(artwork);
        }
    }

    public void saveArtwork(String email, String artworkUrl, String description){
        User user = userRepository.findByEmail(email);

	DateTimeFormatter formatterr = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM)
					.withLocale(Locale.US);

	LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of("Asia/Manila"));
	String dateTime = formatterr.format(localDateTime);

        if (user != null) {
            Artwork artwork = new Artwork();
            artwork.setUser(user);
            artwork.setArtworkUrl(artworkUrl);
            artwork.setDescription(description);
            artwork.setDateTime(dateTime);
            artwork.setPostTimestamp(localDateTime);

            artworkRepository.save(artwork);
        }
    }

    public void updateArtwork(Artwork artwork){
    	artworkRepository.save(artwork);
    }

    public int getArtworksCountByUser(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return artworkRepository.countByStudentInfoUser(user);
        }
        return 0;
    }

    public List<Artwork> getAllArtworks(){
        return artworkRepository.findAll();
    }

    public List<Artwork> findPosts(int offset, int limit){
	return artworkRepository.findAll(PageRequest.of(offset / limit, limit)).getContent();
    }

    public List<Artwork> getArtworksByUserId(Long userId) {
        return artworkRepository.findByUserId(userId);
    }

    public Artwork getArtworkById(Long artworkId){
	return artworkRepository.findById(artworkId).orElse(null);
    }

    public void deleteArtwork(Artwork artwork){
    	artworkRepository.delete(artwork);
    }

    public List<Artwork> searchArtworks(String searchTerm, Long userId){
    	if(searchTerm == null || searchTerm.isEmpty()){
    	   return artworkRepository.findByUserId(userId);
    	}else{
    	   return artworkRepository.search(searchTerm, userId);
    	}
    }

    public List<ArtworkFeedDTO> getArtworkFeedDTOs(int offset, int limit) {
    	Pageable pageable = PageRequest.of(offset / limit, limit);
        return artworkRepository.findAllArtworkFeedDTOs(pageable).getContent();
    }
}
