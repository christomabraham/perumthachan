package com.perumthachan.chuttika.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.perumthachan.chuttika.entities.Stock;


public interface StockRepository extends CrudRepository<Stock, Long> {
	@Query("SELECT t FROM Stock t ORDER BY t.categoryid ")
	List<Stock> findAll();
	
	@Query("SELECT t FROM Stock t WHERE t.subcategory.id=:subCategoryId ")
	List<Stock> getCategorizedStock(@Param("subCategoryId") int subCategoryId);
}