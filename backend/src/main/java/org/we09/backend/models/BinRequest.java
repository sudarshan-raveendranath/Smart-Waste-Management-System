package org.we09.backend.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "binRequests")
public class BinRequest {
    @Id
    private ObjectId requestId;

    private String userId;
    private double totalWeight;
    private String binType;

    public BinRequest(String userId, double totalWeight, String binType) {
        this.userId = userId;
        this.totalWeight = totalWeight;
        this.binType = binType;
    }

    public BinRequest() {
    }

    public ObjectId getRequestId() {
        return requestId;
    }

    public void setRequestId(ObjectId requestId) {
        this.requestId = requestId;
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
