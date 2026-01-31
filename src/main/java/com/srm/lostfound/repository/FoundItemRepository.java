package com.srm.lostfound.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.srm.lostfound.model.FoundItem;

public interface FoundItemRepository extends JpaRepository<FoundItem, Long> {
    List<FoundItem> findByReportedBy(String reportedBy);
}