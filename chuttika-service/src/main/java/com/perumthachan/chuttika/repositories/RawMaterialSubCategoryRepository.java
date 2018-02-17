package com.perumthachan.chuttika.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.perumthachan.chuttika.entities.RawMaterialSubCategory;


public interface RawMaterialSubCategoryRepository extends CrudRepository<RawMaterialSubCategory, Long> {
	List<RawMaterialSubCategory> findAll();
	
	@Query("SELECT t FROM RawMaterialSubCategory t where t.category.id = :categoryId")
	List<RawMaterialSubCategory> findByCategoryId(@Param("categoryId") int categoryId);
	
}