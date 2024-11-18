package com.example.application.data;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Block {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @ManyToOne
   @JoinColumn(name = "blocker_id", nullable = false)
   private User blocker;

   @ManyToOne
   @JoinColumn(name = "blocked_id", nullable = false)
   private User blocked;

   @Enumerated(EnumType.STRING)
   @Column(nullable = false)
   private BlockType blockType;

   public Block(User blocker, User blocked, BlockType blockType) {
        this.blocker = blocker;
        this.blocked = blocked;
        this.blockType = blockType;
   }

   public enum BlockType {
   	MESSAGES_ONLY,
   	FULL_BLOCK
   }
}
