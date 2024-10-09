package org.we09.backend.mappers.interfaces;

import org.we09.backend.dto.BinDto;
import org.we09.backend.models.Bin;

public interface BinMapper {
    Bin toEntity(BinDto binDto);
    BinDto toDTO(Bin bin);
}
