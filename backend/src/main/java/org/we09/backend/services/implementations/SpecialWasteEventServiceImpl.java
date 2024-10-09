package org.we09.backend.services.implementations;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import org.we09.backend.dto.SpecialWasteEventDto;
import org.we09.backend.exceptions.BadRequestException;
import org.we09.backend.exceptions.InternalServerErrorException;
import org.we09.backend.exceptions.ResultNotFoundException;
import org.we09.backend.mappers.interfaces.SpecialWasteEventMapper;
import org.we09.backend.models.SpecialWasteEvent;
import org.we09.backend.repositories.SpecialWasteEventRepository;
import org.we09.backend.services.interfaces.SpecialWasteEventService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SpecialWasteEventServiceImpl implements SpecialWasteEventService {

    private final SpecialWasteEventRepository repository;
    private final SpecialWasteEventMapper mapper;


    public SpecialWasteEventServiceImpl(SpecialWasteEventRepository repository, SpecialWasteEventMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public SpecialWasteEventDto createEvent(SpecialWasteEventDto eventDTO) {
        // Check for missing required fields
        if (eventDTO.getUserId() == null || eventDTO.getWasteType() == null || eventDTO.getDate() == null) {
            throw new BadRequestException("User ID, Waste Type, and Date are required fields.");
        }

        try {
            SpecialWasteEvent event = mapper.toEntity(eventDTO);
            SpecialWasteEvent savedEvent = repository.save(event);
            return mapper.toDTO(savedEvent);
        } catch (Exception ex) {
            throw new InternalServerErrorException("Error occurred while creating the event.");
        }
    }

    @Override
    public SpecialWasteEventDto updateEvent(String eventId, SpecialWasteEventDto eventDTO) {
        ObjectId id = new ObjectId(eventId);

        // Check if the event exists
        SpecialWasteEvent existingEvent = repository.findById(id)
                .orElseThrow(() -> new ResultNotFoundException("Event not found with ID: " + eventId));

        // Validate input data
        if (eventDTO.getDate() == null && eventDTO.getWasteType() == null && eventDTO.getCollectedStatus() == null) {
            throw new BadRequestException("At least one field (Date, WasteType, or CollectedStatus) must be provided for update.");
        }

        // Update the existing event with non-null fields
        if (eventDTO.getDate() != null) {
            existingEvent.setDate(eventDTO.getDate());
        }
        if (eventDTO.getWasteType() != null) {
            existingEvent.setWasteType(eventDTO.getWasteType());
        }
        if (eventDTO.getCollectedStatus() != null) {
            existingEvent.setCollectedStatus(eventDTO.getCollectedStatus());
        }

        try {
            SpecialWasteEvent updatedEvent = repository.save(existingEvent);
            return mapper.toDTO(updatedEvent);
        } catch (Exception ex) {
            throw new InternalServerErrorException("Error occurred while updating the event.");
        }
    }

    @Override
    public SpecialWasteEventDto getEventById(String eventId) {
        ObjectId id = new ObjectId(eventId); // Convert String to ObjectId

        // Check if the event exists
        SpecialWasteEvent event = repository.findById(id)
                .orElseThrow(() -> new ResultNotFoundException("Event not found with ID: " + eventId));
        return mapper.toDTO(event);
    }

    @Override
    public List<SpecialWasteEventDto> getEventsByUserId(String userId) {
        if (userId == null || userId.isEmpty()) {
            throw new BadRequestException("User ID must be provided.");
        }

        return repository.findByUserId(userId)
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteEvent(String eventId) {
        ObjectId id = new ObjectId(eventId); // Convert String to ObjectId

        // Check if the event exists
        SpecialWasteEvent event = repository.findById(id)
                .orElseThrow(() -> new ResultNotFoundException("Event not found with ID: " + eventId));

        try {
            repository.delete(event);
        } catch (Exception ex) {
            throw new InternalServerErrorException("Error occurred while deleting the event.");
        }
    }

    @Override
    public List<SpecialWasteEventDto> getAllEvents() {
        // Fetch all events from the repository, convert them to DTOs, and return
        try {
            return repository.findAll()
                    .stream()
                    .map(mapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception ex) {
            throw new InternalServerErrorException("Error occurred while fetching all events.");
        }
    }
}
