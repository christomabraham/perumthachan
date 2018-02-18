package com.perumthachan.chuttika.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
@Entity
@Table(name = "production_stock")
public class ProductionStock {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int productionStockId;

	@ManyToOne(optional = false)
	@JoinColumn(name="orderid", nullable=false,insertable=false,updatable=false )
	@JsonBackReference
	private JobOrder joborder;
	private String categoryId;
	private String subCategoryId;
	private String stockId;
	private String categoryLabel;
	private String subCategoryLabel;
	private String stockLabel;
	private String availablity;
	private String requirement;
	private String basePrice;
	private String price;
	private String additionalAmt;
	private String volume;
	private String comments;
	private Date createdOn;
	
	

	public int getProductionStockId() {
		return productionStockId;
	}




	public void setProductionStockId(int productionStockId) {
		this.productionStockId = productionStockId;
	}




	public JobOrder getJoborder() {
		return joborder;
	}




	public void setJoborder(JobOrder joborder) {
		this.joborder = joborder;
	}




	public String getCategoryId() {
		return categoryId;
	}




	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}




	public String getSubCategoryId() {
		return subCategoryId;
	}




	public void setSubCategoryId(String subCategoryId) {
		this.subCategoryId = subCategoryId;
	}




	public String getCategoryLabel() {
		return categoryLabel;
	}




	public void setCategoryLabel(String categoryLabel) {
		this.categoryLabel = categoryLabel;
	}




	public String getSubCategoryLabel() {
		return subCategoryLabel;
	}




	public void setSubCategoryLabel(String subCategoryLabel) {
		this.subCategoryLabel = subCategoryLabel;
	}




	public String getAvailablity() {
		return availablity;
	}




	public void setAvailablity(String availablity) {
		this.availablity = availablity;
	}




	public String getRequirement() {
		return requirement;
	}




	public void setRequirement(String requirement) {
		this.requirement = requirement;
	}




	public String getBasePrice() {
		return basePrice;
	}




	public void setBasePrice(String basePrice) {
		this.basePrice = basePrice;
	}




	public String getPrice() {
		return price;
	}




	public void setPrice(String price) {
		this.price = price;
	}




	public String getAdditionalAmt() {
		return additionalAmt;
	}




	public void setAdditionalAmt(String additionalAmt) {
		this.additionalAmt = additionalAmt;
	}




	public String getVolume() {
		return volume;
	}




	public void setVolume(String volume) {
		this.volume = volume;
	}




	public String getComments() {
		return comments;
	}




	public void setComments(String comments) {
		this.comments = comments;
	}




	public Date getCreatedOn() {
		return createdOn;
	}




	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}


	

	public String getStockId() {
		return stockId;
	}




	public void setStockId(String stockId) {
		this.stockId = stockId;
	}




	public String getStockLabel() {
		return stockLabel;
	}




	public void setStockLabel(String stockIdLabel) {
		this.stockLabel = stockIdLabel;
	}




	@Override
	public String toString() {
		return "ProductionStock [id=" + productionStockId + "joborder; + " + joborder.id + "]";
	}

}
