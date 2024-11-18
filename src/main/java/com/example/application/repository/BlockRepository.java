package com.example.application.repository;

import com.example.application.data.dto.block.BlockedUserDTO;
import com.example.application.data.User;
import com.example.application.data.Block;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.List;

public interface BlockRepository extends JpaRepository<Block, Long> {
   @Query("SELECT new com.example.application.data.dto.block.BlockedUserDTO(" +
   	  "b.blocked.id, CONCAT(b.blocked.firstName, ' ', b.blocked.lastName), b.blocked.profileImage, b.blockType"+
   	  ") " +
          "FROM Block b WHERE b.blocker.id = :blockerId")
   List<BlockedUserDTO> findBlockedUsersByBlockerId(@Param("blockerId") Long blockerId);

   Optional<Block> findByBlockerAndBlocked(User blocker, User blocked);

   boolean existsByBlockerAndBlocked(User blocker, User blocked);

   @Modifying
   @Transactional
   void deleteByBlockerAndBlocked(User blocker, User blocked);
}
