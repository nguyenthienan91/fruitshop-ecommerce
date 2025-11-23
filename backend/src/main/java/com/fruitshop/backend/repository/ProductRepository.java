package com.fruitshop.backend.repository;

import com.fruitshop.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByIdAndDeletedFalse(Long id);

    List<Product> findAllByDeletedFalse();
}
