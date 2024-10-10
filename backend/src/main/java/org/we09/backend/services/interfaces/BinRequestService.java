package org.we09.backend.services.interfaces;

import org.we09.backend.dto.BinRequestDto;

import java.util.List;

public interface BinRequestService {
    BinRequestDto createBinRequest(BinRequestDto binRequestDto);
    void deleteBinRequest(String binRequestId);
    BinRequestDto getBinRequestById(String binRequestId);
    List<BinRequestDto> getAllBinRequests();
    List<BinRequestDto> getBinRequestByUserIdAndBinType(String userId, String binType);
}
