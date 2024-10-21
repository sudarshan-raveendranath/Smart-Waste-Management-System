package org.we09.backend.services.strategy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BinExistenceContext {
    private final BinExistenceStrategy strategy;

    @Autowired
    public BinExistenceContext(UserIdAndBinTypeStrategy strategy) {
        this.strategy = strategy;
    }

    public boolean checkExistence(String userId, String binType) {
        return strategy.exists(userId, binType);
    }
}
