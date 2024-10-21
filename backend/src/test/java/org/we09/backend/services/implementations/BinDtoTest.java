package org.we09.backend.services.implementations;



import org.junit.jupiter.api.Test;
import org.we09.backend.dto.BinDto;

import static org.junit.jupiter.api.Assertions.*;

public class BinDtoTest {

    @Test
    public void testDefaultConstructor() {
        BinDto binDto = new BinDto();
        assertNull(binDto.getBinId());
        assertNull(binDto.getUserId());
        assertEquals(0.0, binDto.getTotalWeight());
        assertNull(binDto.getBinType());
        assertEquals(0.0, binDto.getFilledWeight());
        assertNull(binDto.getCollectedStatus());
    }

    @Test
    public void testParameterizedConstructor() {
        BinDto binDto = new BinDto("user1", 100.0, 50.0, "pending", "recyclable");
        assertNull(binDto.getBinId()); // binId should be null initially
        assertEquals("user1", binDto.getUserId());
        assertEquals(100.0, binDto.getTotalWeight());
        assertEquals("recyclable", binDto.getBinType());
        assertEquals(50.0, binDto.getFilledWeight());
        assertEquals("pending", binDto.getCollectedStatus());
    }



    @Test
    public void testSettersAndGetters() {
        BinDto binDto = new BinDto();
        binDto.setBinId("1");
        binDto.setUserId("user1");
        binDto.setTotalWeight(100.0);
        binDto.setFilledWeight(50.0);
        binDto.setCollectedStatus("pending");
        binDto.setBinType("recyclable");

        assertEquals("1", binDto.getBinId());
        assertEquals("user1", binDto.getUserId());
        assertEquals(100.0, binDto.getTotalWeight());
        assertEquals(50.0, binDto.getFilledWeight());
        assertEquals("pending", binDto.getCollectedStatus());
        assertEquals("recyclable", binDto.getBinType());
    }


}
