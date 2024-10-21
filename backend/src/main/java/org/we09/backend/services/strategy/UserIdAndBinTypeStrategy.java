package org.we09.backend.services.strategy;

import org.we09.backend.repositories.BinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserIdAndBinTypeStrategy implements BinExistenceStrategy {

    private final BinRepository binRepository;

    @Autowired
    public UserIdAndBinTypeStrategy(BinRepository binRepository) {
        this.binRepository = binRepository;
    }

    @Override
    public boolean exists(String userId, String binType) {
        return binRepository.existsByUserIdAndBinType(userId, binType);
    }
}
