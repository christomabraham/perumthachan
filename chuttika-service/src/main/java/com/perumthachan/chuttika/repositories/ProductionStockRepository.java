package com.perumthachan.chuttika.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.perumthachan.chuttika.entities.ProductionStock;;


public interface ProductionStockRepository extends CrudRepository<ProductionStock, Long> {
	List<ProductionStock> findAll();
	
	@Query("SELECT t FROM ProductionStock t WHERE paymentId=:id ORDER BY t.createdOn desc ")
	List<ProductionStock> findProductionStockForJobOrder(@Param("id") int id);
}