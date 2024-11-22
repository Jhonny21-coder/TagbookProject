package com.example.application.services;

import com.example.application.data.dto.post.PostReactionDTO;
import com.example.application.data.PostReaction;
import com.example.application.repository.PostReactionRepository;
import com.example.application.repository.ReactionCount;
import com.example.application.data.Artwork;
import com.example.application.repository.ArtworkRepository;
import com.example.application.data.User;
import com.example.application.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import lombok.RequiredArgsConstructor;
import java.util.Optional;
import java.util.List;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class PostReactionService {

    private final ArtworkRepository artworkRepository;
    private final PostReactionRepository postReactionRepository;
    private final UserRepository userRepository;

    public List<PostReaction> getAllPostReactions() {
        return postReactionRepository.findAll();
    }

    public void savePostReaction(Artwork artwork, User reactor, String reactType) {
        if(reactor != null && artwork != null){
            PostReaction postReaction = new PostReaction();
            postReaction.setReactor(reactor);
            postReaction.setArtwork(artwork);
            postReaction.setReactType(reactType);

            postReactionRepository.save(postReaction);
        }
    }

    public List<PostReaction> getPostReactionsByArtworkId(Long artworkId) {
        return postReactionRepository.findByArtworkId(artworkId);
    }

    public PostReaction getPostReactionByReactorAndArtworkId(Long reactorId, Long artworkId){
    	return postReactionRepository.findByReactorIdAndArtworkId(reactorId, artworkId);
    }

    public void removePostReaction(Long reactorId, Long artworkId) {
        // Find the like reaction by user email and artwork ID
        PostReaction reaction = postReactionRepository.findByReactorIdAndArtworkId(reactorId, artworkId);

        // If the like reaction exists, delete it
        if (reaction != null) {
            postReactionRepository.delete(reaction);
        }
    }

    public void deletePostReactionsByArtworkId(Long artworkId){
    	postReactionRepository.deleteByArtworkId(artworkId);
    }

    public void updatePostReaction(PostReaction reactor, String reactType){
    	reactor.setReactType(reactType);

    	postReactionRepository.save(reactor);
    }

    public PostReaction getPostReactionByArtwork(Artwork artwork){
    	return postReactionRepository.findByArtwork(artwork);
    }

    public Long countPostReactionsByArtworkId(Long artworkId) {
    	return postReactionRepository.countByArtworkId(artworkId);
    }

    // Get PostReaction DTO by artwork id
    public List<PostReactionDTO> getReactionsDTO(Long artworkId) {
    	return postReactionRepository.findReactionsByArtworkId(artworkId);
    }

    // Get PostReaction DTO by artwork id and reactor id
    public PostReactionDTO getReactorDTO(Long artworkId, Long reactorId) {
    	return postReactionRepository.findByArtworkIdAndReactorId(artworkId, reactorId);
    }

    // Pagination
    /*public Page<PostReactionDTO> findReactionDTOsByArtworkId(Long artworkId, int pageSize, int pageIndex) {
    	Pageable pageable = PageRequest.of(pageIndex, pageSize, Sort.Direction.DESC,"id");
    	return postReactionRepository.findReactionDTOsByArtworkId(artworkId, pageable);
    }*/

    // Get grouped reaction counts by artwork id
    public Map<String, Long> getReactionCountsByArtworkId(Long artworkId) {
        List<ReactionCount> counts = postReactionRepository.findReactionCountsByArtworkId(artworkId);
        return counts.stream()
                     .collect(Collectors.toMap(ReactionCount::getReactType, ReactionCount::getCount));
    }

    // Get paginated PostReaction DTO by artwork id
    public Page<PostReactionDTO> findReactionDTOsByArtworkIdAndType(Long artworkId, String reactType, int pageSize, int pageIndex) {
        Pageable pageable = PageRequest.of(pageIndex, pageSize);
        Page<PostReaction> reactions;
        if (reactType == null || reactType.equals("all")) {
            reactions = postReactionRepository.findByArtworkId(artworkId, pageable);
        } else {
            reactions = postReactionRepository.findByArtworkIdAndReactType(artworkId, reactType, pageable);
        }
        return reactions.map(this::toDTO);
    }

    // Helper method to convert Page into DTO
    private PostReactionDTO toDTO(PostReaction reaction) {
        return new PostReactionDTO(
            reaction.getReactType(),
            reaction.getReactor().getProfileImage(),
            reaction.getReactor().getFullName()
        );
    }

    // Method to get total reactions by artworkId
    public long getTotalReactionsByArtworkId(Long artworkId) {
        return postReactionRepository.countByArtworkId(artworkId);
    }

    public Page<PostReactionDTO> getTopReactionsByArtworkId(Long artworkId) {
    	Pageable pageable = PageRequest.of(0, 3);
	return postReactionRepository.findTopReactionsByArtworkId(artworkId, pageable);
    }
}
