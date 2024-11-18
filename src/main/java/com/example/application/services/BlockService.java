package com.example.application.services;

import com.example.application.repository.BlockRepository;
import com.example.application.data.User;
import com.example.application.data.Block;
import com.example.application.data.dto.block.BlockedUserDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class BlockService {

   @Autowired
   private BlockRepository blockRepository;

   @Transactional
   public void blockUser(User blocker, User blocked, Block.BlockType type) {
       Block block = blockRepository.findByBlockerAndBlocked(blocker, blocked)
           .orElse(new Block(blocker, blocked, type));
       block.setBlockType(type);
       blockRepository.save(block);
   }

   @Transactional
   public void unblockUser(User blocker, User blocked) {
       blockRepository.deleteByBlockerAndBlocked(blocker, blocked);
   }

   public boolean isMessageOrFullBlocked(User blocker, User blocked, Block.BlockType type) {
   	return blockRepository.findByBlockerAndBlocked(blocker, blocked)
   	   .map(block -> block.getBlockType() == type || block.getBlockType() == Block.BlockType.FULL_BLOCK)
           .orElse(false);
   }

   public boolean isBlocked(User blocker, User blocked, Block.BlockType type) {
       return blockRepository.findByBlockerAndBlocked(blocker, blocked)
           .map(block -> block.getBlockType() == type)
           .orElse(false);
   }

   public boolean canMessageOrCall(User sender, User receiver) {
       return !isBlocked(sender, receiver, Block.BlockType.MESSAGES_ONLY)
              && !isBlocked(receiver, sender, Block.BlockType.FULL_BLOCK);
   }

   public boolean canViewProfile(User viewer, User profileOwner) {
       return !isBlocked(viewer, profileOwner, Block.BlockType.FULL_BLOCK);
   }

   public List<BlockedUserDTO> getBlockedUsersByBlockerId(Long blockerId) {
        return blockRepository.findBlockedUsersByBlockerId(blockerId);
    }
}
