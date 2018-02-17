package com.perumthachan.chuttika.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.perumthachan.chuttika.entities.RawMaterialSupplier;


public interface RawMaterialSupplierRepository extends CrudRepository<RawMaterialSupplier, Long> {
	
	List<RawMaterialSupplier> findAll();
}