package org.we09.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.we09.backend.dto.BinDto;
import org.we09.backend.services.interfaces.BinService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/bins")
public class BinController {

    private final BinService service;

    public BinController(BinService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<BinDto> createBin(@RequestBody BinDto binDto) {
        return ResponseEntity.ok(service.createBin(binDto));
    }

    @GetMapping("/{binId}")
    public ResponseEntity<BinDto> getBinById(@PathVariable String binId) {
        return ResponseEntity.ok(service.getBinById(binId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BinDto>> getBinsByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(service.getBinsByUserId(userId));
    }

    @PutMapping("/{binId}")
    public ResponseEntity<BinDto> updateBin(@PathVariable String binId, @RequestBody BinDto binDto) {
        return ResponseEntity.ok(service.updateBin(binId, binDto));
    }

    @DeleteMapping("/{binId}")
    public ResponseEntity<Void> deleteBin(@PathVariable String binId) {
        service.deleteBin(binId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<BinDto>> getAllBins() {
        List<BinDto> bins = service.getAllBins();
        return ResponseEntity.ok(bins);
    }
}
