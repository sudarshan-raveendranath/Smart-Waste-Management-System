package org.we09.backend.mappers.implementations;

import org.springframework.stereotype.Component;
import org.we09.backend.dto.BinRequestDto;
import org.we09.backend.mappers.interfaces.BinRequestMapper;
import org.we09.backend.models.BinRequest;

@Component
public class BinRequestMapperImpl implements BinRequestMapper {
    @Override
    public BinRequest toEntity(BinRequestDto binRequestDto) {
        return new BinRequest(
                binRequestDto.getUserId(),
                binRequestDto.getTotalWeight(),
                binRequestDto.getBinType()
        );
    }

    @Override
    public BinRequestDto toDTO(BinRequest binRequest) {
        return new BinRequestDto(
                binRequest.getUserId(),
                binRequest.getTotalWeight(),
                binRequest.getBinType()
        );
    }
}
