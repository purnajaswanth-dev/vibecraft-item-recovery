package com.srm.lostfound.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.srm.lostfound.model.*;
import com.srm.lostfound.repository.*;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(
            LostItemRepository lostRepo,
            FoundItemRepository foundRepo
    ) {
        return args -> {

            if (lostRepo.count() == 0) {
                LostItem lost = new LostItem();
                lost.setItemName("Black Wallet");
                lost.setLocation(Location.LIBRARY);
                lost.setDescription("Lost near reading hall");
                lost.setReportedBy("demoUser");
                lost.setMobileNumber("9876543210");
                lost.setStatus(Status.ACTIVE);
                lostRepo.save(lost);
            }

            if (foundRepo.count() == 0) {
                FoundItem found = new FoundItem();
                found.setItemName("Leather Wallet");
                found.setLocation(Location.LIBRARY);
                found.setDescription("Found on table");
                found.setReportedBy("otherUser");
                found.setMobileNumber("9123456789");
                found.setStatus(Status.ACTIVE);
                foundRepo.save(found);
            }

            System.out.println("✅ Sample Lost & Found data inserted");
        };
    }
}
