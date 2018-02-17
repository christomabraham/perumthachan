package com.perumthachan.chuttika.components;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.perumthachan.chuttika.entities.HrResource;
import com.perumthachan.chuttika.entities.RawMaterialCategory;
import com.perumthachan.chuttika.entities.RawMaterialSubCategory;
import com.perumthachan.chuttika.entities.RawMaterialSupplier;
import com.perumthachan.chuttika.entities.Stock;
import com.perumthachan.chuttika.repositories.HrRepository;
import com.perumthachan.chuttika.repositories.RawMaterialCategoryRepository;
import com.perumthachan.chuttika.repositories.RawMaterialSubCategoryRepository;
import com.perumthachan.chuttika.repositories.RawMaterialSupplierRepository;
import com.perumthachan.chuttika.repositories.StockRepository;



@Component
public class RawMaterialComponent {
	
	@Autowired
	private RawMaterialCategoryRepository rawMaterialCategoryRepository;
	
	@Autowired
	private RawMaterialSubCategoryRepository rawMaterialSubCategoryRepository;
	
	@Autowired
	private RawMaterialSupplierRepository rawMaterialSupplierRepository;
	
	@Autowired
	private StockRepository stockRepository;
	
	@Autowired
	private HrRepository hrRepository;

	public List<RawMaterialCategory> getRawMaterialCategories() throws Exception {
		try {
			return rawMaterialCategoryRepository.findAll();
		} catch (Exception e) {
			throw e;
		}
	}

	public RawMaterialCategory addRawMaterialCategory(RawMaterialCategory rawMaterialCategory) throws Exception {
		try {
			return rawMaterialCategoryRepository.save(rawMaterialCategory);
		} catch (Exception e) {
			throw e;
		}
	}
	
	public List<RawMaterialSubCategory> getRawMaterialSubCategories() throws Exception {
		try {
			return rawMaterialSubCategoryRepository.findAll();
		} catch (Exception e) {
			throw e;
		}
	}
	
	public List<RawMaterialSubCategory> getSpecificRawMaterialSubCategories(int categoryId) throws Exception {
		try {
			return rawMaterialSubCategoryRepository.findByCategoryId(categoryId);
		} catch (Exception e) {
			throw e;
		}
	}

	public RawMaterialSubCategory addRawMaterialSubCategory(RawMaterialSubCategory rawMaterialSubCategory) throws Exception {
		try {
			return rawMaterialSubCategoryRepository.save(rawMaterialSubCategory);
		} catch (Exception e) {
			throw e;
		}
	}
	
	public RawMaterialSupplier addRawMaterialSupplier(RawMaterialSupplier rawMaterialSupplier) throws Exception {
		try {
			return rawMaterialSupplierRepository.save(rawMaterialSupplier);
		} catch (Exception e) {
			throw e;
		}
	}
	
	public List<Stock> getStockList() throws Exception {
		try {
			return stockRepository.findAll();
		} catch (Exception e) {
			throw e;
		}
	}

	public Stock addStock(Stock stock) throws Exception {
		try {
			return stockRepository.save(stock);
		} catch (Exception e) {
			throw e;
		}
	}
	public List<HrResource> getHRList() throws Exception {
		try {
			return hrRepository.findAll();
		} catch (Exception e) {
			throw e;
		}
	}

	public HrResource addToHRStock(HrResource hr) throws Exception {
		try {
			return hrRepository.save(hr);
		} catch (Exception e) {
			throw e;
		}
	}
	public List<Stock> getCatagorizedStock(int subCategoryId) throws Exception {
		try {
			return stockRepository.getCategorizedStock(subCategoryId);
		} catch (Exception e) {
			throw e;
		}
	}
}
