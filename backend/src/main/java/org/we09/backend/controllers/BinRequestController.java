package org.we09.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.we09.backend.dto.BinRequestDto;
import org.we09.backend.services.interfaces.BinRequestService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/binrequests")
public class BinRequestController {

    private final BinRequestService service;

    public BinRequestController(BinRequestService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<BinRequestDto> createBinRequest(@RequestBody BinRequestDto binRequestDto) {
        return ResponseEntity.ok(service.createBinRequest(binRequestDto));
    }

    @GetMapping("/{binRequestId}")
    public ResponseEntity<BinRequestDto> getBinRequestById(@PathVariable String binRequestId) {
        return ResponseEntity.ok(service.getBinRequestById(binRequestId));
    }

    @GetMapping
    public ResponseEntity<List<BinRequestDto>> getAllBinRequests() {
        List<BinRequestDto> binRequests = service.getAllBinRequests();
        return ResponseEntity.ok(binRequests);
    }

    @DeleteMapping("/{binRequestId}")
    public ResponseEntity<Void> deleteBinRequest(@PathVariable String binRequestId) {
        service.deleteBinRequest(binRequestId);
        return ResponseEntity.noContent().build();
    }
}
