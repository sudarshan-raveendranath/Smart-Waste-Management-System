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
    private String message = "No Special Waste Event Message";
    private String address;// Default value
    private String collectedStatus = "pending"; // Default value

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // Constructor
    public SpecialWasteEvent(String userId, LocalDate date, String wasteType, String message, String address) {
        this.userId = userId;
        this.date = date;
        this.wasteType = wasteType;
        this.message = message;
        this.address = address;
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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

    public static class Builder {
        private String userId;
        private LocalDate date;
        private String wasteType;
        private String message = "No Special Waste Event Message"; // Default value
        private String address;
        private String collectedStatus = "pending"; // Default value

        public Builder userId(String userId) {
            this.userId = userId;
            return this;
        }

        public Builder date(LocalDate date) {
            this.date = date;
            return this;
        }

        public Builder wasteType(String wasteType) {
            this.wasteType = wasteType;
            return this;
        }

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public Builder address(String address) {
            this.address = address;
            return this;
        }

        public Builder collectedStatus(String collectedStatus) {
            this.collectedStatus = collectedStatus;
            return this;
        }

        // Build method to create a SpecialWasteEvent object
        public SpecialWasteEvent build() {
            return new SpecialWasteEvent(userId, date, wasteType, message, address);
        }
    }
}
