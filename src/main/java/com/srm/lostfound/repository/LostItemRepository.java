package com.srm.lostfound.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.srm.lostfound.model.LostItem;

public interface LostItemRepository extends JpaRepository<LostItem, Long> {
    List<LostItem> findByReportedBy(String reportedBy);
}