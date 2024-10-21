package org.we09.backend.dto;

public class BinDto {
    private String binId;
    private String userId;
    private double totalWeight;
    private String binType;
    private double filledWeight;
    private String collectedStatus;

    public BinDto() {
    }

    public BinDto(String userId, double totalWeight, double filledWeight, String collectedStatus, String binType) {
        this.userId = userId;
        this.totalWeight = totalWeight;
        this.filledWeight = filledWeight;
        this.collectedStatus = collectedStatus;
        this.binType = binType;
    }

    public BinDto(String binId, String userId, double totalWeight, double filledWeight, String collectedStatus, String binType) {
        this.binId = binId;
        this.userId = userId;
        this.totalWeight = totalWeight;
        this.filledWeight = filledWeight;
        this.collectedStatus = collectedStatus;
        this.binType = binType;
    }

    public String getBinId() {
        return binId;
    }

    public void setBinId(String binId) {
        this.binId = binId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public double getTotalWeight() {
        return totalWeight;
    }

    public void setTotalWeight(double totalWeight) {
        this.totalWeight = totalWeight;
    }

    public String getBinType() {
        return binType;
    }

    public void setBinType(String binType) {
        this.binType = binType;
    }

    public double getFilledWeight() {
        return filledWeight;
    }

    public void setFilledWeight(double filledWeight) {
        this.filledWeight = filledWeight;
    }

    public String getCollectedStatus() {
        return collectedStatus;
    }

    public void setCollectedStatus(String collectedStatus) {
        this.collectedStatus = collectedStatus;
    }
}

