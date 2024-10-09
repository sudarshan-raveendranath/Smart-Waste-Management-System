package org.we09.backend.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.we09.backend.models.Bin;

import java.util.List;

@Repository
public interface BinRepository extends MongoRepository<Bin, ObjectId> {
    List<Bin> findByUserId(String userId);
}
