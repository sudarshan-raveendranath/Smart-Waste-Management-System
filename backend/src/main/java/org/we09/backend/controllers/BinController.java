package org.we09.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.we09.backend.dto.BinDto;
import org.we09.backend.exceptions.BadRequestException;
import org.we09.backend.exceptions.InternalServerErrorException;
import org.we09.backend.services.interfaces.BinService;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/bins")
public class BinController {

    private final BinService binService;
    // Changed to binService for consistency

    public BinController(BinService binService) {
        this.binService = binService;  // Use the injected service
    }

    @PostMapping
    public ResponseEntity<BinDto> createBin(@RequestBody BinDto binDto) {
        return ResponseEntity.ok(binService.createBin(binDto));
    }


    @GetMapping("/exist")
    public ResponseEntity<Map<String, Boolean>> checkBinExistence(@RequestParam String userId, @RequestParam String binType) {
        boolean exists;
        if (userId == null || userId.isEmpty() || binType == null || binType.isEmpty()) {
            throw new BadRequestException("User ID and Bin Type must be provided.");
        }

        try {
            exists = binService.binExists(userId, binType);
        } catch (Exception ex) {
            throw new InternalServerErrorException("Error checking bin existence.");  // Ensure proper error handling
        }

        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }






    @GetMapping("/{binId}")
    public ResponseEntity<BinDto> getBinById(@PathVariable String binId) {
        return ResponseEntity.ok(binService.getBinById(binId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BinDto>> getBinsByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(binService.getBinsByUserId(userId));
    }

    @PutMapping("/{binId}")
    public ResponseEntity<BinDto> updateBin(@PathVariable String binId, @RequestBody BinDto binDto) {
        return ResponseEntity.ok(binService.updateBin(binId, binDto));
    }

    @DeleteMapping("/{binId}")
    public ResponseEntity<Void> deleteBin(@PathVariable String binId) {
        binService.deleteBin(binId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<BinDto>> getAllBins() {
        List<BinDto> bins = binService.getAllBins();
        return ResponseEntity.ok(bins);
    }
}
