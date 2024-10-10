package org.we09.backend.mappers.interfaces;

import org.springframework.stereotype.Component;
import org.we09.backend.dto.BinRequestDto;
import org.we09.backend.models.BinRequest;

public interface BinRequestMapper {
    BinRequest toEntity(BinRequestDto binRequestDto);
    BinRequestDto toDTO(BinRequest binRequest);
}
