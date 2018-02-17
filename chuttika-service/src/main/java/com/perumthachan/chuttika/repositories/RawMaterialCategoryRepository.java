package com.perumthachan.chuttika.repositories;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

import com.perumthachan.chuttika.entities.RawMaterialCategory;


public interface RawMaterialCategoryRepository extends CrudRepository<RawMaterialCategory, Long> {
	List<RawMaterialCategory> findAll();
}