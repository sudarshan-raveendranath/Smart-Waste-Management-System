package org.we09.backend.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.we09.backend.models.SpecialWasteEvent;

import java.util.List;

@Repository
public interface SpecialWasteEventRepository extends MongoRepository<SpecialWasteEvent, ObjectId> {
    List<SpecialWasteEvent> findByUserId(String userId);
}
