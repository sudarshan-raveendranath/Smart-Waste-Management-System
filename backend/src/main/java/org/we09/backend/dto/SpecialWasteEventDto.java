package org.we09.backend.dto;

import java.time.LocalDate;

public class SpecialWasteEventDto {
    private String eventId;
    private String userId;
    private LocalDate date;
    private String wasteType;
    private String message;
    private String address;
    private String collectedStatus;

    public SpecialWasteEventDto() {
    }

    // Constructor
    public SpecialWasteEventDto(String userId, LocalDate date, String wasteType, String collectedStatus, String message, String address) {
        this.userId = userId;
        this.date = date;
        this.wasteType = wasteType;
        this.collectedStatus = collectedStatus;
        this.message = message;
        this.address = address;
    }

    public SpecialWasteEventDto(Builder builder) {
        this.eventId = builder.eventId;
        this.userId = builder.userId;
        this.date = builder.date;
        this.wasteType = builder.wasteType;
        this.collectedStatus = builder.collectedStatus;
        this.message = builder.message;
        this.address = builder.address;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public SpecialWasteEventDto(String eventId, String userId, LocalDate date, String wasteType, String collectedStatus, String message, String address) {
        this.eventId = eventId;
        this.userId = userId;
        this.date = date;
        this.wasteType = wasteType;
        this.collectedStatus = collectedStatus;
        this.message = message;
        this.address = address;
    }

    // Getters and Setters

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEventId() {
        return eventId;
    }

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

    // Builder class
    public static class Builder {
        private String eventId;
        private String userId;
        private LocalDate date;
        private String wasteType;
        private String collectedStatus;
        private String message;
        private String address;

        public Builder eventId(String eventId) {
            this.eventId = eventId;
            return this;
        }

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

        public Builder collectedStatus(String collectedStatus) {
            this.collectedStatus = collectedStatus;
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

        public SpecialWasteEventDto build() {
            return new SpecialWasteEventDto(this);
        }
    }
}
