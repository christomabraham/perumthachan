package com.perumthachan.chuttika.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.perumthachan.chuttika.entities.JobOrder;
import com.perumthachan.chuttika.entities.Stock;


public interface JobOrderRepository extends CrudRepository<JobOrder, Long> {
	
	List<JobOrder> findAll();
}