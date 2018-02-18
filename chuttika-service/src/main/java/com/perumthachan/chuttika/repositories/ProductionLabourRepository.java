package com.perumthachan.chuttika.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.perumthachan.chuttika.entities.ProductionLabour;
import com.perumthachan.chuttika.entities.ProductionStock;;


public interface ProductionLabourRepository extends CrudRepository<ProductionLabour, Long> {
	List<ProductionLabour> findAll();	
}