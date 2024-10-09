package org.we09.backend.mappers.implementations;

import org.springframework.stereotype.Component;
import org.we09.backend.dto.SpecialWasteEventDto;
import org.we09.backend.mappers.interfaces.SpecialWasteEventMapper;
import org.we09.backend.models.SpecialWasteEvent;

@Component
public class SpecialWasteEventMapperImpl implements SpecialWasteEventMapper {

    @Override
    public SpecialWasteEvent toEntity(SpecialWasteEventDto eventDTO) {
        return new SpecialWasteEvent(
                eventDTO.getUserId(),
                eventDTO.getDate(),
                eventDTO.getWasteType()
        );
    }

    @Override
    public SpecialWasteEventDto toDTO(SpecialWasteEvent event) {
        return new SpecialWasteEventDto(
                event.getEventId().toHexString(),
                event.getUserId(),
                event.getDate(),
                event.getWasteType(),
                event.getCollectedStatus()
        );
    }
}
