package org.we09.backend.services.implementations;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import org.we09.backend.dto.BinDto;
import org.we09.backend.exceptions.BadRequestException;
import org.we09.backend.exceptions.InternalServerErrorException;
import org.we09.backend.exceptions.ResultNotFoundException;
import org.we09.backend.mappers.interfaces.BinMapper;
import org.we09.backend.models.Bin;
import org.we09.backend.repositories.BinRepository;
import org.we09.backend.services.interfaces.BinService;
import org.we09.backend.services.strategy.BinExistenceContext;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BinServiceImpl implements BinService {

    private final BinRepository binRepository;
    private final BinMapper binMapper;
    private final BinExistenceContext existenceContext;

    public BinServiceImpl(BinRepository binRepository, BinMapper binMapper, BinExistenceContext existenceContext) {
        this.binRepository = binRepository;
        this.binMapper = binMapper;
        this.existenceContext = existenceContext;
    }

    @Override
    public boolean binExists(String userId, String binType) {
        return existenceContext.checkExistence(userId, binType);
    }

    @Override
    public BinDto createBin(BinDto binDto) {
        if (existenceContext.checkExistence(binDto.getUserId(), binDto.getBinType())) {
            throw new RuntimeException("Bin already exists");
        }
        Bin bin = binMapper.toEntity(binDto);
        try {
            binRepository.save(bin);
        } catch (RuntimeException e) {
            // Log the exception if needed
            throw new RuntimeException("Save failed", e);
        }
        return binMapper.toDTO(bin);
    }





    @Override
    public BinDto updateBin(String binId, BinDto binDto) {
        ObjectId id = new ObjectId(binId);

        // Check if the bin exists
        Bin existingBin = binRepository.findById(id)
                .orElseThrow(() -> new ResultNotFoundException("Bin not found with ID: " + binId));

        // Validate input data
        if (binDto.getTotalWeight() == 0.0 &&  binDto.getFilledWeight() == 0.0 && binDto.getCollectedStatus() == null) {
            throw new BadRequestException("At least one field (TotalWeight, FilledWeight or CollectedStatus) must be provided for update.");
        }

        // Update the existing bin with non-null fields
        if (binDto.getTotalWeight() != 0.0) {
            existingBin.setTotalWeight(binDto.getTotalWeight());
        }
        if (binDto.getFilledWeight() != 0.0) {
            existingBin.setFilledWeight(binDto.getFilledWeight());
        }
        if (binDto.getCollectedStatus() != null) {
            existingBin.setCollectedStatus(binDto.getCollectedStatus());
        }

        try {
            Bin updatedBin = binRepository.save(existingBin);
            return binMapper.toDTO(updatedBin);
        } catch (Exception ex) {
            throw new InternalServerErrorException("Error occurred while updating the bin.");
        }
    }

    @Override
    public BinDto getBinById(String binId) {
        ObjectId id = new ObjectId(binId);

        // Check if the bin exists
        Bin bin = binRepository.findById(id)
                .orElseThrow(() -> new ResultNotFoundException("Bin not found with ID: " + binId));
        return binMapper.toDTO(bin);
    }

    @Override
    public List<BinDto> getBinsByUserId(String userId) {
        if (userId == null || userId.isEmpty()) {
            throw new BadRequestException("User ID must be provided.");
        }

        return binRepository.findByUserId(userId)
                .stream()
                .map(binMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<BinDto> getAllBins() {
        // Fetch all bins from the repository, map them to DTOs, and collect them into a list to return
        try {
            return binRepository.findAll()
                    .stream()
                    .map(binMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception ex) {
            throw new InternalServerErrorException("Error occurred while fetching all bins.");
        }
    }

    @Override
    public void deleteBin(String binId) {
        ObjectId id = new ObjectId(binId);

        // Check if the bin exists
        Bin bin = binRepository.findById(id)
                .orElseThrow(() -> new ResultNotFoundException("Bin not found with ID: " + binId));

        try {
            binRepository.delete(bin);
        } catch (Exception ex) {
            throw new InternalServerErrorException("Error occurred while deleting the bin.");
        }
    }
    @Override
    public boolean existsByUserIdAndBinType(String userId, String binType) {
        // Implementation using the repository
        return binRepository.existsByUserIdAndBinType(userId, binType);
    }
}
