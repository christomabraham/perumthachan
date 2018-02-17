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
@Table(name = "job_order_payment")
public class JobOrderPayment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int paymentId;

	@ManyToOne(optional = false)
	@JoinColumn(name="orderid", nullable=false,insertable=false,updatable=false )
	@JsonBackReference
	private JobOrder joborder;
	private String amount;
	private Date dateOfPayment;
	private String method;
	private String addittionalInfo;
	private Date createdDate;

	public int getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(int paymentId) {
		this.paymentId = paymentId;
	}

	public JobOrder getJoborder() {
		return joborder;
	}

	public void setJoborder(JobOrder joborder) {
		this.joborder = joborder;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public Date getDateOfPayment() {
		return dateOfPayment;
	}

	public void setDateOfPayment(Date dateOfPayment) {
		this.dateOfPayment = dateOfPayment;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getAddittionalInfo() {
		return addittionalInfo;
	}

	public void setAddittionalInfo(String addittionalInfo) {
		this.addittionalInfo = addittionalInfo;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	@Override
	public String toString() {
		return "JobOrderPayment [id=" + paymentId + "amount; + " + amount + "]";
	}

}
