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

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BinServiceImpl implements BinService {

    private final BinRepository binRepository;
    private final BinMapper binMapper;

    public BinServiceImpl(BinRepository binRepository, BinMapper binMapper) {
        this.binRepository = binRepository;
        this.binMapper = binMapper;
    }

    @Override
    public BinDto createBin(BinDto binDto) {
        if (binDto.getUserId() == null || binDto.getTotalWeight() == 0.0) {
            throw new BadRequestException("User ID and Total Weight are required fields.");
        }

        try {
            Bin bin = binMapper.toEntity(binDto);
            Bin savedBin = binRepository.save(bin);
            return binMapper.toDTO(savedBin);
        } catch (Exception ex) {
            throw new InternalServerErrorException("Error occurred while creating the bin.");
        }
    }

    @Override
    public BinDto updateBin(String binId, BinDto binDto) {
        ObjectId id = new ObjectId(binId);

        // Check if the bin exists
        Bin existingBin = binRepository.findById(id)
                .orElseThrow(() -> new ResultNotFoundException("Bin not found with ID: " + binId));

        // Validate input data
        if (binDto.getTotalWeight() == 0.0 && binDto.getPlasticWeight() == 0.0 && binDto.getPaperWeight() == 0.0 && binDto.getFoodWeight() == 0.0 && binDto.getCollectedStatus() == null) {
            throw new BadRequestException("At least one field (TotalWeight, PlasticWeight, PaperWeight, FoodWeight, or CollectedStatus) must be provided for update.");
        }

        // Update the existing bin with non-null fields
        if (binDto.getTotalWeight() != 0.0) {
            existingBin.setTotalWeight(binDto.getTotalWeight());
        }
        if (binDto.getPlasticWeight() != 0.0) {
            existingBin.setPlasticWeight(binDto.getPlasticWeight());
        }
        if (binDto.getPaperWeight() != 0.0) {
            existingBin.setPaperWeight(binDto.getPaperWeight());
        }
        if (binDto.getFoodWeight() != 0.0) {
            existingBin.setFoodWeight(binDto.getFoodWeight());
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
}
