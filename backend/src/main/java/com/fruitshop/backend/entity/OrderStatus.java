package com.fruitshop.backend.entity;

public enum OrderStatus {
    PENDING, //đơn mới tạo chưa thanh toán
    PAID, //khách đã thanh toán thành công (dành cho thanh toán online)
    PROCESSING, //shop đang chuẩn bị đơn hàng
    SHIPPED, //đã giao cho đơn vị vận chuyển
    DELIVERED, //khách hàng đã nhận hàng thành công
    CANCELLED, //đơn bị huỷ bởi người dùng hoặc admin
    RETURNED, //khách trả hàng, hoàn tiền (xử lí đổi trả)
}
