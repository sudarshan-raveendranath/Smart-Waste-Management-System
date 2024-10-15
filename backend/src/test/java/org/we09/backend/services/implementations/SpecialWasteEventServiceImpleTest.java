package org.we09.backend.services.implementations;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.we09.backend.dto.SpecialWasteEventDto;
import org.we09.backend.exceptions.BadRequestException;
import org.we09.backend.exceptions.InternalServerErrorException;
import org.we09.backend.exceptions.ResultNotFoundException;
import org.we09.backend.mappers.interfaces.SpecialWasteEventMapper;
import org.we09.backend.models.SpecialWasteEvent;
import org.we09.backend.repositories.SpecialWasteEventRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.bson.assertions.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class SpecialWasteEventServiceImpleTest {

    @Mock
    private SpecialWasteEventRepository repository;

    @Mock
    private SpecialWasteEventMapper mapper;

    @InjectMocks
    private SpecialWasteEventServiceImpl service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);  // Initialize mocks
    }

    //test cases for createEvent method
    //test case for missing fields
    @Test
    void createEvent_shouldThrowBadRequestExceptionWhenFieldsAreMissing() {
        // Arrange: Create a DTO with missing fields
        SpecialWasteEventDto eventDto = new SpecialWasteEventDto(); // Missing all required fields

        // Act & Assert: Expect BadRequestException to be thrown
        BadRequestException exception = assertThrows(BadRequestException.class, () -> {
            service.createEvent(eventDto);
        });

        assertEquals("User ID, Waste Type, address and Date are required fields.", exception.getMessage());
    }

    //test case for successful creation
    @Test
    void createEvent_shouldReturnDtoWhenCreationIsSuccessful() {
        // Arrange: Create a valid DTO using Builder and mock repository and mapper behaviors
        SpecialWasteEventDto eventDto = new SpecialWasteEventDto.Builder()
                .userId("64e1fbe2d1a29a12d4f0c9e7")
                .wasteType("Plastic")
                .date(LocalDate.parse("2024-10-15"))
                .address("123 Main St")
                .build();

        SpecialWasteEvent event = new SpecialWasteEvent.Builder()
                .userId(eventDto.getUserId())
                .wasteType(eventDto.getWasteType())
                .date(eventDto.getDate())
                .address(eventDto.getAddress())
                .build();

        when(mapper.toEntity(eventDto)).thenReturn(event);
        when(repository.save(event)).thenReturn(event);
        when(mapper.toDTO(event)).thenReturn(eventDto);

        // Act: Call the createEvent method
        SpecialWasteEventDto result = service.createEvent(eventDto);

        // Assert: Verify the event was created and returned correctly
        assertNotNull(result);
        assertEquals(eventDto, result);
        verify(repository, times(1)).save(event);
    }

    //test case for internal server error
    @Test
    void createEvent_shouldThrowInternalServerErrorExceptionOnRepositoryError() {
        // Arrange: Create a valid DTO and mock repository to throw an exception
        SpecialWasteEventDto eventDto = new SpecialWasteEventDto.Builder()
                .userId("validUserId") // Set userId
                .wasteType("Plastic") // Set wasteType
                .date(LocalDate.parse("2024-10-15")) // Set date
                .address("123 Main St") // Set address
                .build();

        SpecialWasteEvent event = new SpecialWasteEvent.Builder()
                .userId(eventDto.getUserId())
                .wasteType(eventDto.getWasteType())
                .date(eventDto.getDate())
                .address(eventDto.getAddress())
                .build();

        when(mapper.toEntity(eventDto)).thenReturn(event);
        when(repository.save(event)).thenThrow(new RuntimeException("Database error")); // Simulate DB error

        // Act & Assert: Expect InternalServerErrorException to be thrown
        InternalServerErrorException exception = assertThrows(InternalServerErrorException.class, () -> {
            service.createEvent(eventDto);
        });

        assertEquals("Error occurred while creating the event.", exception.getMessage());
    }


    //test cases for update method
    //test case for event not found
    @Test
    void updateEvent_shouldThrowResultNotFoundExceptionWhenEventDoesNotExist() {
        // Arrange
        String validButNonExistentEventId = ObjectId.get().toHexString();
        when(repository.findById(any(ObjectId.class))).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResultNotFoundException.class, () -> {
            service.updateEvent(validButNonExistentEventId, new SpecialWasteEventDto());
        });
    }

    //test case for successful update
    @Test
    void updateEvent_shouldUpdateEventWhenFieldsAreValid() {
        // Arrange
        String eventId = "64e1fbe2d1a29a12d4f0c9e7";
        SpecialWasteEvent existingEvent = new SpecialWasteEvent.Builder().build();
        String wasteType = "Hazardous";
        SpecialWasteEventDto eventDto = new SpecialWasteEventDto.Builder()
                .wasteType(wasteType) // Use wasteType instead of date
                .build();

        when(repository.findById(any(ObjectId.class))).thenReturn(Optional.of(existingEvent));
        when(repository.save(existingEvent)).thenReturn(existingEvent);
        when(mapper.toDTO(existingEvent)).thenReturn(eventDto);

        // Act
        SpecialWasteEventDto result = service.updateEvent(eventId, eventDto);

        // Assert
        assertEquals(eventDto.getWasteType(), result.getWasteType()); // Compare wasteType fields
    }


    //test case for internal server error
    @Test
    void updateEvent_shouldThrowInternalServerErrorExceptionOnSaveError() {
        // Arrange
        String wasteType = "Hazardous";
        String validEventId = ObjectId.get().toHexString();
        SpecialWasteEvent existingEvent = new SpecialWasteEvent.Builder().build();

        // Provide at least one valid field to avoid BadRequestException
        SpecialWasteEventDto eventDto = new SpecialWasteEventDto.Builder()
                .wasteType(wasteType) // Use wasteType instead of date
                .build();

        when(repository.findById(any(ObjectId.class))).thenReturn(Optional.of(existingEvent));
        when(repository.save(any(SpecialWasteEvent.class))).thenThrow(new RuntimeException("Database error"));

        // Act & Assert
        InternalServerErrorException exception = assertThrows(InternalServerErrorException.class, () -> {
            service.updateEvent(validEventId, eventDto);
        });

        assertEquals("Error occurred while updating the event.", exception.getMessage());
    }




    //test cases for getEventById method
    //test case for event not found
    @Test
    void getEventById_shouldThrowResultNotFoundExceptionWhenEventDoesNotExist() {
        // Arrange
        String validButNonExistentEventId = ObjectId.get().toHexString();
        when(repository.findById(any(ObjectId.class))).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResultNotFoundException.class, () -> {
            service.getEventById(validButNonExistentEventId);
        });
    }

    //test case for successful retrieval
    @Test
    void getEventById_shouldReturnEventDtoWhenEventExists() {
        // Arrange
        String validButNonExistentEventId = ObjectId.get().toHexString();
        SpecialWasteEvent event = new SpecialWasteEvent.Builder().build();
        SpecialWasteEventDto eventDto = new SpecialWasteEventDto.Builder().build();

        when(repository.findById(any(ObjectId.class))).thenReturn(Optional.of(event));
        when(mapper.toDTO(event)).thenReturn(eventDto);

        // Act
        SpecialWasteEventDto result = service.getEventById(validButNonExistentEventId);

        // Assert
        assertNotNull(result);
        assertEquals(eventDto, result);
    }

    //test case for internal server error
    @Test
    void getEventById_shouldThrowInternalServerErrorExceptionOnError() {
        // Arrange
        String validEventId = ObjectId.get().toHexString();
        when(repository.findById(any(ObjectId.class))).thenThrow(new RuntimeException("Database error"));

        // Act & Assert
        assertThrows(InternalServerErrorException.class, () -> {
            service.getEventById(validEventId);
        });
    }

    //test cases for getEventsByUserId method
    //test case for missing user id
    @Test
    void getEventsByUserId_shouldThrowBadRequestExceptionWhenUserIdIsMissing() {
        // Act & Assert
        assertThrows(BadRequestException.class, () -> {
            service.getEventsByUserId(null);
        });
    }

    //test case for successful retrieval
    @Test
    void getEventsByUserId_shouldReturnEventListForValidUserId() {
        // Arrange
        String userId = "validUserId";
        List<SpecialWasteEvent> events = List.of(new SpecialWasteEvent.Builder().build());
        List<SpecialWasteEventDto> eventDtos = List.of(new SpecialWasteEventDto.Builder().build());

        when(repository.findByUserId(userId)).thenReturn(events);
        when(mapper.toDTO(any(SpecialWasteEvent.class))).thenReturn(new SpecialWasteEventDto());

        // Act
        List<SpecialWasteEventDto> result = service.getEventsByUserId(userId);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
    }

    //test case for internal server error
    @Test
    void getEventsByUserId_shouldThrowInternalServerErrorExceptionOnError() {
        // Arrange
        String userId = "validUserId";
        when(repository.findByUserId(userId)).thenThrow(new RuntimeException("Database error"));

        // Act & Assert
        assertThrows(InternalServerErrorException.class, () -> {
            service.getEventsByUserId(userId);
        });
    }

    //test cases for deleteEvent method
    //test case for event not found
    @Test
    void deleteEvent_shouldThrowResultNotFoundExceptionWhenEventDoesNotExist() {
        // Arrange
        String validButNonExistentEventId = ObjectId.get().toHexString(); // Create a valid ObjectId string
        when(repository.findById(any(ObjectId.class))).thenReturn(Optional.empty()); // Simulate event not found

        // Act & Assert
        assertThrows(ResultNotFoundException.class, () -> {
            service.deleteEvent(validButNonExistentEventId);
        });
    }


    //test case for successful deletion
    @Test
    void deleteEvent_shouldDeleteEventWhenItExists() {
        // Arrange
        String validEventId = ObjectId.get().toHexString();
        SpecialWasteEvent event = new SpecialWasteEvent.Builder().build();
        when(repository.findById(any(ObjectId.class))).thenReturn(Optional.of(event));

        // Act
        service.deleteEvent(validEventId);

        // Assert
        verify(repository, times(1)).delete(event);
    }

    //test case for internal server error
    @Test
    void deleteEvent_shouldThrowInternalServerErrorExceptionOnRepositoryError() {
        // Arrange
        String validEventId = ObjectId.get().toHexString(); // Create a valid ObjectId string
        SpecialWasteEvent event = new SpecialWasteEvent.Builder().build();

        // Mock the repository behavior
        when(repository.findById(any(ObjectId.class))).thenReturn(Optional.of(event));
        doThrow(new RuntimeException("Database error")).when(repository).delete(event); // Simulate deletion error

        // Act & Assert
        InternalServerErrorException exception = assertThrows(InternalServerErrorException.class, () -> {
            service.deleteEvent(validEventId);
        });

        assertEquals("Error occurred while deleting the event.", exception.getMessage());
    }


}
