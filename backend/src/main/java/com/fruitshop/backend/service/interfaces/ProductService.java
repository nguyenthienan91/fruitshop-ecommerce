package com.fruitshop.backend.service.interfaces;

import com.fruitshop.backend.entity.Product;
import com.fruitshop.backend.model.request.ProductRequest;
import com.fruitshop.backend.model.request.ProductUpdateRequest;
import com.fruitshop.backend.model.response.ProductResponse;

import java.util.List;

public interface ProductService {
    ProductResponse createProduct(ProductRequest request);

    ProductResponse updateProduct(Long id, ProductUpdateRequest request);

    void deleteProduct(Long id);

    ProductResponse getProductById(Long id);

    List<ProductResponse> getAllProducts();
}
