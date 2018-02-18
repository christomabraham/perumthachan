package com.perumthachan.chuttika.controllers;

import java.util.Date;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.perumthachan.chuttika.components.JobOrderComponent;
import com.perumthachan.chuttika.entities.JobOrder;
import com.perumthachan.chuttika.entities.ProductionLabour;
import com.perumthachan.chuttika.entities.ProductionStock;
import com.perumthachan.chuttika.entities.Stock;
import com.perumthachan.chuttika.repositories.StockRepository;;

@CrossOrigin
@Controller
@RequestMapping(path = "/chuttika/jobOrder")

public class JobOrderController {
	private final Logger logger = LogManager.getLogger(this.getClass());

	@Autowired
	private JobOrderComponent jobOrderService;

	@Autowired
	private StockRepository stockRepo;

	@RequestMapping(value = "/getAllJobOrders", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody List<JobOrder> getAllJobOrders() throws Exception {

		try {
			return jobOrderService.getJobOrders();
		} catch (Exception e) {
			logger.error("****Exception in getAllJobOrders() " + e.getMessage());
			throw e;
		}

	}

	@RequestMapping(value = "/saveJobOrder", method = RequestMethod.POST, produces = "application/json")
	public @ResponseBody boolean saveJobOrder(@RequestBody JobOrder data) throws Exception {
		try {
			for (ProductionStock stock : data.getProductionStock()) {
				if (stock.getProductionStockId() == 0) {
					Stock temp = stockRepo.getStock(Integer.parseInt(stock.getStockId()));
					temp.setQuantity(temp.getQuantity() - Integer.parseInt(stock.getRequirement()));
					temp.setUpdatedDate(new Date());
					stockRepo.save(temp);
				}
			}
			
			return jobOrderService.saveJobOrder(data) != null ? true : false;
		} catch (Exception e) {
			logger.error("****Exception in saveJobOrder() " + e.getMessage());
			throw e;
		}

	}

	private boolean isValid(String data) {
		return !(data == null || data.trim().equals(""));

	}
}
