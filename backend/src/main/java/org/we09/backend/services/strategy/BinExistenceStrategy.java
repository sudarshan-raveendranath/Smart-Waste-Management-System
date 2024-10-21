package org.we09.backend.services.strategy;

public interface BinExistenceStrategy {
    boolean exists(String userId, String binType);
}
