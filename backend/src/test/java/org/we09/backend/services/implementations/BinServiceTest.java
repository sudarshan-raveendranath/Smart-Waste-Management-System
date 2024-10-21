package org.we09.backend.services.implementations;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.we09.backend.dto.BinDto;
import org.we09.backend.mappers.interfaces.BinMapper;
import org.we09.backend.models.Bin;
import org.we09.backend.repositories.BinRepository;
import org.we09.backend.services.strategy.BinExistenceContext;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class BinServiceTest {

    @Mock
    private BinRepository binRepository;

    @Mock
    private BinMapper binMapper;

    @Mock
    private BinExistenceContext existenceContext; // Mock for BinExistenceContext

    @InjectMocks
    private BinServiceImpl binService;

    private BinDto binDto;
    private Bin bin;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        binDto = new BinDto("user123", 100.0, 0.0, "pending", "recyclable");
        bin = new Bin("user123", 100.0, "recyclable");
        bin.setBinId(new ObjectId());
    }

    @Test
    public void createBin_ShouldReturnBinDto() {
        // Arrange
        when(binMapper.toEntity(any(BinDto.class))).thenReturn(bin);
        when(binRepository.save(any(Bin.class))).thenReturn(bin);
        when(binMapper.toDTO(any(Bin.class))).thenReturn(binDto);
        when(existenceContext.checkExistence(anyString(), anyString())).thenReturn(false); // Simulate bin not existing

        // Act
        BinDto createdBin = binService.createBin(binDto);

        // Assert
        assertNotNull(createdBin);
        assertEquals(binDto.getUserId(), createdBin.getUserId());
        assertEquals(binDto.getTotalWeight(), createdBin.getTotalWeight());
        verify(binMapper, times(1)).toEntity(binDto);
        verify(binRepository, times(1)).save(bin);
        verify(binMapper, times(1)).toDTO(bin);
    }

    @Test
    public void createBin_ShouldThrowException_WhenSaveFails() {
        // Arrange
        when(binMapper.toEntity(any(BinDto.class))).thenReturn(bin);
        when(binRepository.save(any(Bin.class))).thenThrow(new RuntimeException("Save failed"));
        when(existenceContext.checkExistence(anyString(), anyString())).thenReturn(false); // Simulate bin not existing

        // Act & Assert
        RuntimeException thrown = assertThrows(RuntimeException.class, () -> binService.createBin(binDto));

        // Ensure the message contains the expected part (if needed)
        assertTrue(thrown.getMessage().contains("Save failed")); // Check for part of the message

        // Print message to console for success case
        System.out.println("Test passed: createBin_ShouldThrowException_WhenSaveFails");

        verify(binRepository, times(1)).save(bin);
    }


    @Test
    public void updateBin_ShouldUpdateAndReturnUpdatedBin() {
        when(binRepository.findById(any(ObjectId.class))).thenReturn(Optional.of(bin));
        when(binRepository.save(any(Bin.class))).thenReturn(bin);
        when(binMapper.toDTO(any(Bin.class))).thenReturn(binDto);

        BinDto updatedBin = binService.updateBin(bin.getBinId().toHexString(), binDto);

        assertNotNull(updatedBin);
        assertEquals(binDto.getFilledWeight(), updatedBin.getFilledWeight());
        assertEquals(binDto.getCollectedStatus(), updatedBin.getCollectedStatus());
        verify(binRepository, times(1)).findById(any(ObjectId.class));
    }

    @Test
    public void updateBin_ShouldThrowException_WhenBinNotFound() {
        when(binRepository.findById(any(ObjectId.class))).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> binService.updateBin(bin.getBinId().toHexString(), binDto));
        verify(binRepository, times(1)).findById(any(ObjectId.class));
        verify(binRepository, never()).save(any(Bin.class));
    }

    @Test
    public void deleteBin_ShouldDeleteExistingBin() {
        when(binRepository.findById(any(ObjectId.class))).thenReturn(Optional.of(bin));

        assertDoesNotThrow(() -> binService.deleteBin(bin.getBinId().toHexString()));

        verify(binRepository, times(1)).delete(bin);
    }

    @Test
    public void deleteBin_ShouldThrowException_WhenBinNotFound() {
        when(binRepository.findById(any(ObjectId.class))).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> binService.deleteBin(bin.getBinId().toHexString()));
        verify(binRepository, times(1)).findById(any(ObjectId.class));
        verify(binRepository, never()).delete(any(Bin.class));
    }

    @Test
    public void getBinById_ShouldReturnBinDto() {
        when(binRepository.findById(any(ObjectId.class))).thenReturn(Optional.of(bin));
        when(binMapper.toDTO(any(Bin.class))).thenReturn(binDto);

        BinDto retrievedBin = binService.getBinById(bin.getBinId().toHexString());

        assertNotNull(retrievedBin);
        assertEquals(binDto.getBinType(), retrievedBin.getBinType());
        assertEquals(binDto.getUserId(), retrievedBin.getUserId());
        verify(binRepository, times(1)).findById(any(ObjectId.class));
    }

    @Test
    public void getBinById_ShouldThrowException_WhenBinNotFound() {
        when(binRepository.findById(any(ObjectId.class))).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> binService.getBinById(bin.getBinId().toHexString()));
        verify(binRepository, times(1)).findById(any(ObjectId.class));
    }

}
