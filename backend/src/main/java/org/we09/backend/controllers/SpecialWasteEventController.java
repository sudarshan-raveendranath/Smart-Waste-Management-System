package org.we09.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.we09.backend.dto.SpecialWasteEventDto;
import org.we09.backend.services.interfaces.SpecialWasteEventService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/events")
public class SpecialWasteEventController {


    private final SpecialWasteEventService service;

    public SpecialWasteEventController(SpecialWasteEventService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<SpecialWasteEventDto> createEvent(@RequestBody SpecialWasteEventDto eventDTO) {
        return ResponseEntity.ok(service.createEvent(eventDTO));
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<SpecialWasteEventDto> getEventById(@PathVariable String eventId) {
        return ResponseEntity.ok(service.getEventById(eventId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SpecialWasteEventDto>> getEventsByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(service.getEventsByUserId(userId));
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<SpecialWasteEventDto> updateEvent(@PathVariable String eventId, @RequestBody SpecialWasteEventDto eventDTO) {
        return ResponseEntity.ok(service.updateEvent(eventId, eventDTO));
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable String eventId) {
        service.deleteEvent(eventId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<SpecialWasteEventDto>> getAllEvents() {
        List<SpecialWasteEventDto> events = service.getAllEvents();
        return ResponseEntity.ok(events);
    }
}
