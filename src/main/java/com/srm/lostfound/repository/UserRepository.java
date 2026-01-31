package com.srm.lostfound.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.srm.lostfound.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
