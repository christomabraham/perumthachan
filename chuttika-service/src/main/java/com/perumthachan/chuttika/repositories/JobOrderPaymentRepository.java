package com.perumthachan.chuttika.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.perumthachan.chuttika.entities.JobOrder;
import com.perumthachan.chuttika.entities.JobOrderPayment;


public interface JobOrderPaymentRepository extends CrudRepository<JobOrderPayment, Long> {
	List<JobOrderPayment> findAll();
	
	@Query("SELECT t FROM JobOrder t WHERE id=:id ORDER BY t.createdDate desc ")
	List<JobOrderPayment> findPaymentsForJobOrder(@Param("id") int id);
}