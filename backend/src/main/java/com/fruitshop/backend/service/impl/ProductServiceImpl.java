package com.fruitshop.backend.service.impl;

import com.fruitshop.backend.entity.Product;
import com.fruitshop.backend.exception.exceptions.ProductNotFoundException;
import com.fruitshop.backend.model.request.ProductRequest;
import com.fruitshop.backend.model.request.ProductUpdateRequest;
import com.fruitshop.backend.model.response.ProductResponse;
import com.fruitshop.backend.repository.ProductRepository;
import com.fruitshop.backend.service.interfaces.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;


    @Override
    public ProductResponse createProduct(ProductRequest request) {
        //Map ProductRequest sang Entity Product
        Product product = modelMapper.map(request, Product.class);
        //Lưu vào database
        Product savedProduct = productRepository.save(product);
        return modelMapper.map(savedProduct, ProductResponse.class);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductUpdateRequest request) {
        // Tìm Product cần update, throw exception nếu không tìm thấy
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + id));

        // Map dữ liệu từ request vào existing product
        modelMapper.map(request, existingProduct);

        // Giữ nguyên id (đảm bảo không bị thay đổi)
        existingProduct.setId(id);

        // Lưu vào database
        Product updatedProduct = productRepository.save(existingProduct);
        // Map sang ProductResponse và trả về
        return modelMapper.map(updatedProduct, ProductResponse.class);
    }

    @Override
    public void deleteProduct(Long id) {
        // Tìm Product cần delete, throw exception nếu không tìm thấy
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + id));
        //soft delete
        existingProduct.setDeleted(true);
        //lưu vào db
        productRepository.save(existingProduct);

    }

    @Override
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + id));
        modelMapper.map(product, ProductResponse.class);
        return null;
    }

    @Override
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAllByDeletedFalse()
                .stream().map(product -> modelMapper.map(product, ProductResponse.class)).toList();
    }
}
