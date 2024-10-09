package org.we09.backend.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "bins")
public class Bin {
    @Id
    private ObjectId binId;

    private String userId;
    private double totalWeight;
    private double foodWeight = 0;
    private double plasticWeight = 0;
    private double paperWeight = 0;
    private String collectedStatus = "pending";

    public Bin(String userId, double totalWeight) {
        this.userId = userId;
        this.totalWeight = totalWeight;
    }

    public ObjectId getBinId() {
        return binId;
    }

    public void setBinId(ObjectId binId) {
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
