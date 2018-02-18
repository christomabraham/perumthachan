package com.perumthachan.chuttika.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.perumthachan.chuttika.entities.HrResource;


public interface HrRepository extends CrudRepository<HrResource, Long> {
	List<HrResource> findAll();
	
	@Query("SELECT t FROM HrResource t WHERE specialization=:spec ORDER BY t.name  ")
	List<HrResource> getLaboursForSpecialization(@Param("spec") String spec);
}