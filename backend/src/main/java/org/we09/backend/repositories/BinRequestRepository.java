package org.we09.backend.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.we09.backend.models.BinRequest;

import java.util.List;

@Repository
public interface BinRequestRepository extends MongoRepository<BinRequest, ObjectId> {
    List<BinRequest> findByUserId(String userId);
}
