package com.perumthachan.chuttika.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
public class RawMaterialSubCategory {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;
	private String price;
	private String description;

	@ManyToOne
	@NotNull
	private RawMaterialCategory category;
	
	@ManyToOne
	private RawMaterialSupplier supplier;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public RawMaterialCategory getCategory() {
		return category;
	}

	public void setCategory(RawMaterialCategory category) {
		this.category = category;
	}
	
	public RawMaterialSupplier getSupplier() {
		return supplier;
	}

	public void setSupplier(RawMaterialSupplier supplier) {
		this.supplier = supplier;
	}

	@Override
	public String toString() {
		return "RawMaterialSubCategory [id=" + id + ", name=" + name + "]";
	}

}
