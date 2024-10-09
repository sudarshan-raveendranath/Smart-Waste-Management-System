package org.we09.backend.mappers.implementations;

import org.springframework.stereotype.Component;
import org.we09.backend.dto.BinDto;
import org.we09.backend.mappers.interfaces.BinMapper;
import org.we09.backend.models.Bin;

@Component
public class BinMapperImpl implements BinMapper {
    @Override
    public Bin toEntity(BinDto binDto) {
        return new Bin(
                binDto.getUserId(),
                binDto.getTotalWeight()
        );
    }

    @Override
    public BinDto toDTO(Bin bin) {
        return new BinDto(
                bin.getBinId().toHexString(),
                bin.getUserId(),
                bin.getTotalWeight(),
                bin.getFoodWeight(),
                bin.getFoodWeight(),
                bin.getPaperWeight(),
                bin.getCollectedStatus()
        );
    }
}
