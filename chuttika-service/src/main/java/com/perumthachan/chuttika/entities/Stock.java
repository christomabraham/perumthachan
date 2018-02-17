package com.perumthachan.chuttika.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

@Entity
public class Stock {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private Date createdDate;
	private Date updatedDate;
	private int categoryid;
	@OneToOne
	@NotNull
	private RawMaterialSubCategory subcategory;
	
	
	private float length;
	private float width;
	private float thickness;
	private long quantity;
	private String stockType;

	

	public int getId() {
		return id;
	}



	public void setId(int id) {
		this.id = id;
	}



	public Date getCreatedDate() {
		return createdDate;
	}



	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}



	public Date getUpdatedDate() {
		return updatedDate;
	}



	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}



	public RawMaterialSubCategory getSubcategory() {
		return subcategory;
	}



	public void setSubcategory(RawMaterialSubCategory subcategory) {
		this.subcategory = subcategory;
	}



	public float getLength() {
		return length;
	}



	public void setLength(float length) {
		this.length = length;
	}



	public float getWidth() {
		return width;
	}



	public void setWidth(float width) {
		this.width = width;
	}



	public float getThickness() {
		return thickness;
	}



	public void setThickness(float thickness) {
		this.thickness = thickness;
	}



	public long getQuantity() {
		return quantity;
	}



	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}
	
	
	public String getStockType() {
		return stockType;
	}



	public void setStockType(String stockType) {
		this.stockType = stockType;
	}

	

	public int getCategoryid() {
		return categoryid;
	}



	public void setCategoryid(int categoryid) {
		this.categoryid = categoryid;
	}



	@Override
	public String toString() {
		return "Stock [id=" + id + ", category.id=" + subcategory.getId() + ", category.name=" + subcategory.getName() + "]";
	}

}
