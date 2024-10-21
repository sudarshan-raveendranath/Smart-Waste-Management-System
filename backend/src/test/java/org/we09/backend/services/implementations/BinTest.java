package org.we09.backend.services.implementations;



import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.we09.backend.models.Bin;

import static org.junit.jupiter.api.Assertions.*;

class BinTest {

    @Test
    void testNoArgConstructor() {
        Bin bin = new Bin();
        assertNotNull(bin);
        assertNull(bin.getBinId());
        assertNull(bin.getUserId());
        assertEquals(0, bin.getTotalWeight());
        assertNull(bin.getBinType());
        assertEquals(0, bin.getFilledWeight());
        assertEquals("pending", bin.getCollectedStatus());
    }

    @Test
    void testConstructorWithUserIdTotalWeightAndBinType() {
        Bin bin = new Bin("user1", 100.0, "recyclable");
        assertEquals("user1", bin.getUserId());
        assertEquals(100.0, bin.getTotalWeight());
        assertEquals("recyclable", bin.getBinType());
        assertEquals(0, bin.getFilledWeight());
        assertEquals("pending", bin.getCollectedStatus());
    }

    @Test
    void testGettersAndSetters() {
        Bin bin = new Bin();
        ObjectId id = new ObjectId();

        bin.setBinId(id);
        bin.setUserId("user2");
        bin.setTotalWeight(200.0);
        bin.setBinType("organic");
        bin.setFilledWeight(50.0);
        bin.setCollectedStatus("collected");

        assertEquals(id, bin.getBinId());
        assertEquals("user2", bin.getUserId());
        assertEquals(200.0, bin.getTotalWeight());
        assertEquals("organic", bin.getBinType());
        assertEquals(50.0, bin.getFilledWeight());
        assertEquals("collected", bin.getCollectedStatus());
    }

    @Test
    void testToString() {
        Bin bin = new Bin("user1", 100.0, "recyclable");
        bin.setBinId(new ObjectId());
        bin.setFilledWeight(50.0);
        bin.setCollectedStatus("pending");

        String expectedString = "Bin{" +
                "binId='" + bin.getBinId() + '\'' +
                ", userId='user1'" +
                ", totalWeight=100.0" +
                ", binType='recyclable'" +
                ", filledWeight=50.0" +
                ", collectedStatus='pending'" +
                '}';

        assertEquals(expectedString, bin.toString());
    }
}
