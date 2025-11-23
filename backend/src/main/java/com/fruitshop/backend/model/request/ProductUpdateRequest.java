package com.fruitshop.backend.model.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductUpdateRequest {

    private String name;
    private BigDecimal price;
    private String description;
    private String imageUrl;
    private String category;
    private int stock;

}
