package com.perumthachan.chuttika.components;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.perumthachan.chuttika.entities.JobOrder;
import com.perumthachan.chuttika.entities.JobOrderPayment;
import com.perumthachan.chuttika.repositories.JobOrderPaymentRepository;
import com.perumthachan.chuttika.repositories.JobOrderRepository;

@Component
public class JobOrderComponent {

	@Autowired
	private JobOrderRepository jobOrderRepository;
	
	@Autowired
	private JobOrderPaymentRepository jobOrderPaymentRepository;

	public List<JobOrder> getJobOrders() throws Exception {
		try {
			return jobOrderRepository.findAll();
		} catch (Exception e) {
			throw e;
		}
	}
	public JobOrder saveJobOrder(JobOrder jobOrder) throws Exception {
		try {
			System.out.println("xxxxxxxx--11JobOrder-->>"+jobOrder);
			JobOrder order= jobOrderRepository.save(jobOrder);
			List<JobOrderPayment> savedPayments=new ArrayList<JobOrderPayment>();
			/*System.out.println("xxxxxxxx--22JobOrder-->>"+order);
			for(JobOrderPayment payment:jobOrder.getPayments()) {
				System.out.println("xxxxxxxx--33Payment-->>"+payment);
				//payment.setOrderId(jobOrder.getId());
				//payment.setOrderNumber(jobOrder.getOrderNumber());
				payment.setCreatedDate(jobOrder.getCreatedDate());
				savedPayments.add(jobOrderPaymentRepository.save(payment));
				
			}
			order.setPayments(savedPayments);*/
			return order;
		} catch (Exception e) {
			throw e;
		}
	}
}
