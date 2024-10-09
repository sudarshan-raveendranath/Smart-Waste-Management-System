package org.we09.backend.services.interfaces;

import org.we09.backend.dto.SpecialWasteEventDto;

import java.util.List;

public interface SpecialWasteEventService {
    SpecialWasteEventDto createEvent(SpecialWasteEventDto eventDTO);
    SpecialWasteEventDto updateEvent(String eventId, SpecialWasteEventDto eventDTO);
    SpecialWasteEventDto getEventById(String eventId);
    List<SpecialWasteEventDto> getEventsByUserId(String userId);
    List<SpecialWasteEventDto> getAllEvents();
    void deleteEvent(String eventId);
}
