package com.srm.lostfound.controller;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.srm.lostfound.model.FoundItem;
import com.srm.lostfound.model.Location;
import com.srm.lostfound.model.Status;
import com.srm.lostfound.repository.FoundItemRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/found")
@CrossOrigin
public class FoundItemController {

    private final FoundItemRepository repository;

    public FoundItemController(FoundItemRepository repository) {
        this.repository = repository;
    }

    @PostMapping(consumes = "multipart/form-data")
public FoundItem createFound(
        @RequestParam String itemName,
        @RequestParam String location,
        @RequestParam String description,
        @RequestParam String reportedBy,
        @RequestParam String mobileNumber,

        @RequestParam(required = false) MultipartFile image
) throws Exception {

    FoundItem item = new FoundItem();
    item.setItemName(itemName);
    item.setLocation(Location.valueOf(location));
    item.setDescription(description);
    item.setReportedBy(reportedBy);
    item.setMobileNumber(mobileNumber);

    item.setStatus(Status.ACTIVE);

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
    public FoundItem getFoundById(@PathVariable Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Found item not found"));
}


    @GetMapping
    public Iterable<FoundItem> getAll() {
        return repository.findAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping("/{id}/resolve")
    public FoundItem resolve(@PathVariable Long id) {
        FoundItem item = repository.findById(id).orElseThrow();
        item.setStatus(Status.RESOLVED);
        return repository.save(item);
    }
}