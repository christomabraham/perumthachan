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
@Table(name = "production_labour")
public class ProductionLabour {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int labourStockId;

	@ManyToOne(optional = false)
	@JoinColumn(name="orderid", nullable=false,insertable=false,updatable=false )
	@JsonBackReference
	private JobOrder joborder;
	
	private Date date;
	private String specialization;
	private String labourId;
	private String labourName;
	private String startTime;
	private String endTime;
	private String duration;
	private String basicWage;
	private String wageForDay;
	private String comments;
	private Date createdOn;
	
	
	public int getLabourStockId() {
		return labourStockId;
	}


	public void setLabourStockId(int labourStockId) {
		this.labourStockId = labourStockId;
	}


	public JobOrder getJoborder() {
		return joborder;
	}


	public void setJoborder(JobOrder joborder) {
		this.joborder = joborder;
	}


	public Date getDate() {
		return date;
	}


	public void setDate(Date date) {
		this.date = date;
	}


	public String getSpecialization() {
		return specialization;
	}


	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}


	public String getLabourId() {
		return labourId;
	}


	public void setLabourId(String labourId) {
		this.labourId = labourId;
	}


	public String getLabourName() {
		return labourName;
	}


	public void setLabourName(String labourName) {
		this.labourName = labourName;
	}


	public String getStartTime() {
		return startTime;
	}


	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}


	public String getEndTime() {
		return endTime;
	}


	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}


	public String getDuration() {
		return duration;
	}


	public void setDuration(String duration) {
		this.duration = duration;
	}


	public String getBasicWage() {
		return basicWage;
	}


	public void setBasicWage(String basicWage) {
		this.basicWage = basicWage;
	}


	public String getWageForDay() {
		return wageForDay;
	}


	public void setWageForDay(String wageForDay) {
		this.wageForDay = wageForDay;
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


	@Override
	public String toString() {
		return "ProductionLabour [id=" + labourStockId + "joborder; + " + joborder.id + "]";
	}

}
