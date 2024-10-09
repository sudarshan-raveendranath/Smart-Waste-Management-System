package org.we09.backend.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "specialWasteEvents")
public class SpecialWasteEvent {
    @Id
    private ObjectId eventId; // Primary key

    private String userId;
    private LocalDate date;
    private String wasteType;
    private String collectedStatus = "pending"; // Default value

    // Constructor
    public SpecialWasteEvent(String userId, LocalDate date, String wasteType) {
        this.userId = userId;
        this.date = date;
        this.wasteType = wasteType;
    }

    public ObjectId getEventId() {
        return eventId;
    }

    public void setEventId(ObjectId eventId) {
        this.eventId = eventId;
    }

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getWasteType() {
        return wasteType;
    }

    public void setWasteType(String wasteType) {
        this.wasteType = wasteType;
    }

    public String getCollectedStatus() {
        return collectedStatus;
    }

    public void setCollectedStatus(String collectedStatus) {
        this.collectedStatus = collectedStatus;
    }
}
