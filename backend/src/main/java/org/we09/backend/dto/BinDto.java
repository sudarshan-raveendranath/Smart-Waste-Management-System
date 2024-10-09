package org.we09.backend.dto;

public class BinDto {
    private String binId;
    private String userId;
    private double totalWeight;
    private double foodWeight;
    private double plasticWeight;
    private double paperWeight;
    private String collectedStatus;

    public BinDto() {
    }

    public BinDto(String userId, double totalWeight, double foodWeight, double plasticWeight, double paperWeight, String collectedStatus) {
        this.userId = userId;
        this.totalWeight = totalWeight;
        this.foodWeight = foodWeight;
        this.plasticWeight = plasticWeight;
        this.paperWeight = paperWeight;
        this.collectedStatus = collectedStatus;
    }

    public BinDto(String binId, String userId, double totalWeight, double foodWeight, double plasticWeight, double paperWeight, String collectedStatus) {
        this.binId = binId;
        this.userId = userId;
        this.totalWeight = totalWeight;
        this.foodWeight = foodWeight;
        this.plasticWeight = plasticWeight;
        this.paperWeight = paperWeight;
        this.collectedStatus = collectedStatus;
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

    public double getFoodWeight() {
        return foodWeight;
    }

    public void setFoodWeight(double foodWeight) {
        this.foodWeight = foodWeight;
    }

    public double getPlasticWeight() {
        return plasticWeight;
    }

    public void setPlasticWeight(double plasticWeight) {
        this.plasticWeight = plasticWeight;
    }

    public double getPaperWeight() {
        return paperWeight;
    }

    public void setPaperWeight(double paperWeight) {
        this.paperWeight = paperWeight;
    }

    public String getCollectedStatus() {
        return collectedStatus;
    }

    public void setCollectedStatus(String collectedStatus) {
        this.collectedStatus = collectedStatus;
    }
}
