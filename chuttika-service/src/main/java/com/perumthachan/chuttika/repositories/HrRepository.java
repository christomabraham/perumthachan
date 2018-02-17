package com.perumthachan.chuttika.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.perumthachan.chuttika.entities.HrResource;
import com.perumthachan.chuttika.entities.Stock;


public interface HrRepository extends CrudRepository<HrResource, Long> {
	List<HrResource> findAll();
}