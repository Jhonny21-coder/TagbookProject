package com.example.application.data;

import com.example.application.data.post.PostType;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Artwork {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_info_id")
    private StudentInfo studentInfo;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String artworkUrl;
    private String description;

    @Column(nullable = false)
    private LocalDateTime postTimestamp;

    private String dateTime;
    private String background;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PostType postType;

    @Convert(converter = StringListConverter.class)
    @Column(name = "uploaded_images", nullable = true)
    private List<String> uploadedImages;
}
