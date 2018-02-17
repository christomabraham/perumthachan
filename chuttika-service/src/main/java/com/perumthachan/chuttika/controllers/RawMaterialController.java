package com.perumthachan.chuttika.controllers;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.perumthachan.chuttika.entities.HrResource;
import com.perumthachan.chuttika.entities.RawMaterialCategory;
import com.perumthachan.chuttika.entities.RawMaterialSubCategory;
import com.perumthachan.chuttika.entities.Stock;
import com.perumthachan.chuttika.components.RawMaterialComponent;;

@CrossOrigin
@Controller
@RequestMapping(path = "/chuttika/rawmaterials")

public class RawMaterialController {
	private final Logger logger = LogManager.getLogger(this.getClass());

	@Autowired
	private RawMaterialComponent rawMaterialService;

	@RequestMapping(value = "/getRawMaterialCategories", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody List<RawMaterialCategory> getRawMaterialCategories() throws Exception {

		try {
			return rawMaterialService.getRawMaterialCategories();
		} catch (Exception e) {
			logger.error("****Exception in getRawMaterialCategories() " + e.getMessage());
			throw e;
		}

	}
	
	@RequestMapping(value = "/addRawMaterialCategory", method = RequestMethod.POST, produces = "application/json")
	public @ResponseBody boolean addRawMaterialCategory(@RequestBody RawMaterialCategory body ) throws Exception {
		try {
			return rawMaterialService.addRawMaterialCategory(body)!=null?true:false;
		} catch (Exception e) {
			logger.error("****Exception in addRawMaterialCategory() " + e.getMessage());
			throw e;
		}

	}
	
	@RequestMapping(value = "/getRawMaterialSubCategories", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody List<RawMaterialSubCategory> getRawMaterialSubCategories() throws Exception {

		try {
			return rawMaterialService.getRawMaterialSubCategories();
		} catch (Exception e) {
			logger.error("****Exception in getRawMaterialCategories() " + e.getMessage());
			throw e;
		}

	}
	
	@RequestMapping(value = "/getSpecificRawMaterialSubCategories", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody List<RawMaterialSubCategory> getSpecificRawMaterialSubCategories(@RequestParam int categoryId) throws Exception {

		try {
			return rawMaterialService.getSpecificRawMaterialSubCategories(categoryId);
		} catch (Exception e) {
			logger.error("****Exception in getSpecificRawMaterialSubCategories() " + e.getMessage());
			throw e;
		}

	}
	
	
	
	@RequestMapping(value = "/addRawMaterialSubCategory", method = RequestMethod.POST, produces = "application/json")
	public @ResponseBody boolean addRawMaterialSubCategory(@RequestBody RawMaterialSubCategory body ) throws Exception {
		try {
			if(isValid(body.getSupplier().getName()) || isValid(body.getSupplier().getAddress()) || isValid(body.getSupplier().getEmail()) || isValid(body.getSupplier().getMobile()) ||
					isValid(body.getSupplier().getCompany()) ) {
				body.setSupplier(rawMaterialService.addRawMaterialSupplier(body.getSupplier()));
			}else {
				body.setSupplier(null);
			}
			return rawMaterialService.addRawMaterialSubCategory(body)!=null?true:false;
		} catch (Exception e) {
			logger.error("****Exception in addRawMaterialSubCategory() " + e.getMessage());
			throw e;
		}

	}
	
	@RequestMapping(value = "/getStockList", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody List<Stock> getStockList() throws Exception {

		try {
			return rawMaterialService.getStockList();
		} catch (Exception e) {
			logger.error("****Exception in getStockList() " + e.getMessage());
			throw e;
		}

	}
	
	@RequestMapping(value = "/getCatagorizedStock", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody List<Stock> getCatagorizedStock(@RequestParam int subCategoryId) throws Exception {

		try {
			return rawMaterialService.getCatagorizedStock(subCategoryId);
		} catch (Exception e) {
			logger.error("****Exception in getStockList() " + e.getMessage());
			throw e;
		}

	}
	
	@RequestMapping(value = "/addToStock", method = RequestMethod.POST, produces = "application/json")
	public @ResponseBody boolean addStock(@RequestBody Stock body ) throws Exception {
		try {
			return rawMaterialService.addStock(body)!=null?true:false;
		} catch (Exception e) {
			logger.error("****Exception in addStock() " + e.getMessage());
			throw e;
		}

	}
	
	@RequestMapping(value = "/getHRList", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody List<HrResource> getHRList() throws Exception {

		try {
			return rawMaterialService.getHRList();
		} catch (Exception e) {
			logger.error("****Exception in getHRList() " + e.getMessage());
			throw e;
		}

	}
	
	@RequestMapping(value = "/addToHRStock", method = RequestMethod.POST, produces = "application/json")
	public @ResponseBody boolean addToHRStock(@RequestBody HrResource body ) throws Exception {
		try {
			return rawMaterialService.addToHRStock(body)!=null?true:false;
		} catch (Exception e) {
			logger.error("****Exception in addToHRStock() " + e.getMessage());
			throw e;
		}

	}
	
	private boolean isValid(String data){
		return !(data==null || data.trim().equals(""));
		
	}
}
