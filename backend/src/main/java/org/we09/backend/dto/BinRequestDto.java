package org.we09.backend.dto;

public class BinRequestDto {
    private String userId;
    private double totalWeight;
    private String binType;

    public BinRequestDto() {
    }

    public BinRequestDto(String userId, double totalWeight, String binType) {
        this.userId = userId;
        this.totalWeight = totalWeight;
        this.binType = binType;
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
}
