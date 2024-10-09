package org.we09.backend.mappers.interfaces;

import org.we09.backend.dto.SpecialWasteEventDto;
import org.we09.backend.models.SpecialWasteEvent;

public interface SpecialWasteEventMapper {
    SpecialWasteEvent toEntity(SpecialWasteEventDto eventDTO);
    SpecialWasteEventDto toDTO(SpecialWasteEvent event);
}
