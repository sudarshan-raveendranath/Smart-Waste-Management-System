package org.we09.backend.services.implementations;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import org.we09.backend.dto.BinRequestDto;
import org.we09.backend.exceptions.BadRequestException;
import org.we09.backend.exceptions.InternalServerErrorException;
import org.we09.backend.exceptions.ResultNotFoundException;
import org.we09.backend.mappers.interfaces.BinRequestMapper;
import org.we09.backend.models.BinRequest;
import org.we09.backend.repositories.BinRequestRepository;
import org.we09.backend.services.interfaces.BinRequestService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BinRequestServiceImpl implements BinRequestService {

    private final BinRequestRepository binRequestRepository;
    private final BinRequestMapper binRequestMapper;

    public BinRequestServiceImpl(BinRequestRepository binRequestRepository, BinRequestMapper binRequestMapper) {
        this.binRequestRepository = binRequestRepository;
        this.binRequestMapper = binRequestMapper;
    }

    @Override
    public BinRequestDto createBinRequest(BinRequestDto binRequestDto) {
        if (binRequestDto.getUserId() == null || binRequestDto.getBinType() == null || binRequestDto.getTotalWeight() == 0.0) {
            throw new BadRequestException("User ID, Bin Type and Total Weight are required fields.");
        }

        try {
            BinRequest binRequest = binRequestMapper.toEntity(binRequestDto);
            BinRequest savedBinRequest = binRequestRepository.save(binRequest);
            return binRequestMapper.toDTO(savedBinRequest);
        } catch (Exception ex) {
            throw new InternalServerErrorException("Error occurred while creating the bin request.");
        }
    }

    @Override
    public void deleteBinRequest(String binRequestId) {
        ObjectId id = new ObjectId(binRequestId);

        BinRequest existingBinRequest = binRequestRepository.findById(id)
                .orElseThrow(() -> new ResultNotFoundException("Bin Request not found with ID: " + binRequestId));

        try {
            binRequestRepository.delete(existingBinRequest);
        } catch (Exception ex) {
            throw new InternalServerErrorException("Error occurred while deleting the bin request.");
        }
    }

    @Override
    public BinRequestDto getBinRequestById(String binRequestId) {
        ObjectId id = new ObjectId(binRequestId);

        BinRequest existingBinRequest = binRequestRepository.findById(id)
                .orElseThrow(() -> new ResultNotFoundException("Bin Request not found with ID: " + binRequestId));

        return binRequestMapper.toDTO(existingBinRequest);
    }

    @Override
    public List<BinRequestDto> getAllBinRequests() {
        try {
            return binRequestRepository.findAll()
                    .stream()
                    .map(binRequestMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception ex) {
            throw new InternalServerErrorException("Error occurred while fetching all bin requests.");
        }
    }

    @Override
    public List<BinRequestDto> getBinRequestByUserIdAndBinType(String userId, String binType) {
        try {
            return binRequestRepository.findByUserIdAndBinType(userId, binType)
                    .stream()
                    .map(binRequestMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception ex) {
            throw new InternalServerErrorException("Error occurred while fetching bin requests by user ID and bin type.");
        }
    }

}
