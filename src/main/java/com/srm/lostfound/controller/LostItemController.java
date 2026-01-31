package com.srm.lostfound.controller;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.srm.lostfound.model.LostItem;
import com.srm.lostfound.model.Location;
import com.srm.lostfound.model.Status;
import com.srm.lostfound.repository.LostItemRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/lost")
@CrossOrigin
public class LostItemController {

    private final LostItemRepository repository;

    public LostItemController(LostItemRepository repository) {
        this.repository = repository;
    }

    @PostMapping(consumes = "multipart/form-data")
public LostItem createLost(
        @RequestParam String itemName,
        @RequestParam String location,
        @RequestParam String description,
        @RequestParam String reportedBy,
        @RequestParam String mobileNumber,

        @RequestParam(required = false) MultipartFile image
) throws Exception {

    LostItem item = new LostItem();
    item.setItemName(itemName);
    item.setLocation(Location.valueOf(location));
    item.setDescription(description);
    item.setReportedBy(reportedBy);
    item.setMobileNumber(mobileNumber);
    item.setStatus(Status.ACTIVE);

    // ===== IMAGE SAVE =====
    if (image != null && !image.isEmpty()) {
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path path = Paths.get("uploads/" + fileName);
        Files.createDirectories(path.getParent());
        Files.write(path, image.getBytes());
        item.setImageUrl("/" + fileName);
    }

    return repository.save(item);
}
    @GetMapping("/{id}")
    public LostItem getLostById(@PathVariable Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Lost item not found"));
}


    @GetMapping
    public Iterable<LostItem> getAll() {
        return repository.findAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping("/{id}/resolve")
    public LostItem resolve(@PathVariable Long id) {
        LostItem item = repository.findById(id).orElseThrow();
        item.setStatus(Status.RESOLVED);
        return repository.save(item);
    }
}