package com.example.application.repository;

import com.example.application.data.dto.user.UserDTO;
import com.example.application.data.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("""
    	SELECT new com.example.application.data.dto.user.UserDTO(
    	    CONCAT(u.firstName, ' ', u.lastName),
    	    u.id
    	)
    	FROM User u
    """)
    List<UserDTO> findUsersFullNameDTO();

    User findByEmail(String email);
    User findByPassword(String password);

    @Query("SELECT c FROM User c " +
       "WHERE (LOWER(CONCAT(c.firstName, ' ', c.lastName)) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<User> search(@Param("searchTerm") String searchTerm);

    @Query("SELECT u FROM User u " +
       "WHERE (LOWER(CONCAT(u.firstName, ' ', u.lastName)) LIKE LOWER(:fullName))")
    User findByFullName(String fullName);
}
