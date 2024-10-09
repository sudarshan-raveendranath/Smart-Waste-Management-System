package org.we09.backend.services.interfaces;

import org.we09.backend.dto.BinDto;

import java.util.List;

public interface BinService {
    BinDto createBin(BinDto binDto);
    BinDto updateBin(String binId, BinDto binDto);
    BinDto getBinById(String binId);
    List<BinDto> getBinsByUserId(String userId);
    List<BinDto> getAllBins();
    void deleteBin(String binId);
}
