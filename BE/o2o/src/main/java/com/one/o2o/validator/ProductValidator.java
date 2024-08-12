package com.one.o2o.validator;

import com.one.o2o.exception.products.ProductErrorCode;
import com.one.o2o.exception.products.ProductException;
import lombok.extern.slf4j.Slf4j;

import java.io.UnsupportedEncodingException;

import static com.one.o2o.constants.ProductConstants.MAX_PRODUCT_NAME_LENGTH;
import static com.one.o2o.constants.ProductConstants.MIN_PRODUCT_CNT;

@Slf4j
public class ProductValidator {

    public static void validateProductName(String productName) throws UnsupportedEncodingException {
        if (productName == null || productName.isEmpty()) {
            throw new ProductException(ProductErrorCode.PRODUCT_NAME_MISSING);
        }
        int byteLength = productName.getBytes("UTF-8").length;
        log.info("byteLength = {}", byteLength);
        if (byteLength > MAX_PRODUCT_NAME_LENGTH) {
            throw new ProductException(ProductErrorCode.PRODUCT_NAME_LENGTH_OVER);
        }
    }

    public static void validateProductCount(int count) {
        if (count < MIN_PRODUCT_CNT) {
            throw new ProductException(ProductErrorCode.PRODUCT_CNT_NEGATIVE);
        }
    }
}