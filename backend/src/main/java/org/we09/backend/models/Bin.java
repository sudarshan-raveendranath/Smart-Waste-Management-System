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
    private String binType;
    private double filledWeight = 0;
    private String collectedStatus = "pending";

    public Bin() {
        // No-argument constructor
    }


    public Bin(String userId, double totalWeight, String binType) {
        this.userId = userId;
        this.totalWeight = totalWeight;
        this.binType = binType;
    }



    @Override
    public String toString() {
        return "Bin{" +
                "binId='" + binId + '\'' +
                ", userId='" + userId + '\'' +
                ", totalWeight=" + totalWeight +
                ", binType='" + binType + '\'' +
                ", filledWeight=" + filledWeight +
                ", collectedStatus='" + collectedStatus + '\'' +
                '}';
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
