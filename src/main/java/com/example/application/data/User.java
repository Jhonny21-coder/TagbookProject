package com.example.application.data;

import com.example.application.data.story.Story;
import com.example.application.data.story.ViewedStory;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private String dateOfBirth;

    @Column(nullable = false)
    private String placeOfBirth;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String profileImage;

    @Column(nullable = false)
    private String bio;

    @Column(nullable = false)
    private String coverPhoto;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String verification;

    private boolean enabled;
    private boolean activeStatus;
    private boolean pushNotifications;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private StudentInfo studentInfo;

    /**
     * List of users that this user has blocked.
     *
     * <p>
     * This field establishes a one-to-many relationship between the User
     * entity and the Block entity, where this user is the blocker.
     * When a user blocks another user, a new Block entry is created.
     *
     * <p>
     * The cascade option set to {@link CascadeType#ALL} means that any
     * operations (like persist or remove) performed on this User will
     * also be cascaded to the associated Block entities. The fetch type
     * is set to {@link FetchType#LAZY}, meaning that the blocked users
     * will only be loaded from the database when this list is accessed,
     * enhancing performance by avoiding unnecessary data retrieval.
     * </p>
     *
     * @see Block
     */
    /*@OneToMany(mappedBy = "blocker", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Block> blockedUsers;*/

    /**
     * List of users who have blocked this user.
     *
     * <p>
     * This field establishes a one-to-many relationship between the User
     * entity and the Block entity, where this user is the blocked party.
     * When another user blocks this user, a new Block entry is created.
     *
     * <p>
     * The cascade option set to {@link CascadeType#ALL} means that any
     * operations (like persist or remove) performed on this User will
     * also be cascaded to the associated Block entities. The fetch type
     * is set to {@link FetchType#LAZY}, meaning that the list of users
     * who have blocked this user will only be loaded from the database
     * when this list is accessed, enhancing performance by avoiding
     * unnecessary data retrieval.
     * </p>
     *
     * @see Block
     */
     /*@OneToMany(mappedBy = "blocked", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
     private List<Block> blockedByUsers;*/

    /*@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Story> stories;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ViewedStory> viewedStories;*/

    public String getFullName(){
	return firstName + " " + lastName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true; // Check if it's the same instance
        if (o == null || getClass() != o.getClass()) return false; // Check class compatibility
        User user = (User) o;
        return Objects.equals(id, user.id); // Check equality based on 'id'
    }

    @Override
    public int hashCode() {
        return Objects.hash(id); // Generate consistent hash code based on 'id'
    }
}
