package com.srm.lostfound.controller;

import com.srm.lostfound.model.FoundItem;
import com.srm.lostfound.model.LostItem;
import com.srm.lostfound.repository.FoundItemRepository;
import com.srm.lostfound.repository.LostItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/match")
@CrossOrigin
public class MatchController {

    private final LostItemRepository lostRepo;
    private final FoundItemRepository foundRepo;

    public MatchController(LostItemRepository lostRepo,
                           FoundItemRepository foundRepo) {
        this.lostRepo = lostRepo;
        this.foundRepo = foundRepo;
    }

    // ✅ Match LOST item with FOUND items
    @GetMapping("/lost/{id}")
    public Map<String, Object> matchLost(@PathVariable Long id) {

        LostItem lost = lostRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Lost item not found"));

        List<FoundItem> foundItems = foundRepo.findAll();

        List<Map<String, Object>> matches = new ArrayList<>();

        for (FoundItem f : foundItems) {
            int score = calculateMatch(lost.getItemName(), f.getItemName());

            Map<String, Object> match = new HashMap<>();
            match.put("item", f);
            match.put("score", score);
            matches.add(match);
        }

        // ✅ RETURN BOTH
        Map<String, Object> response = new HashMap<>();
        response.put("selectedItem", lost);
        response.put("matches", matches);

        return response;
    }

    private int calculateMatch(String a, String b) {
        a = a.toLowerCase();
        b = b.toLowerCase();

        if (a.equals(b)) return 90;
        if (a.contains(b) || b.contains(a)) return 60;
        return 30;
    }
}
