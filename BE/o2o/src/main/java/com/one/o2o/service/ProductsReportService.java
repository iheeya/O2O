package com.one.o2o.service;

import com.one.o2o.dto.common.PageInfoDto;
import com.one.o2o.dto.common.Response;
import com.one.o2o.entity.*;
import com.one.o2o.dto.products.report.ProductsReportDto;
import com.one.o2o.dto.products.report.ReportProcessDto;
import com.one.o2o.dto.products.report.UsersReportDto;
import com.one.o2o.entity.products.report.ProductsReport;
import com.one.o2o.repository.ProductsReportRepository;
import com.one.o2o.validator.ProductValidator;
import com.one.o2o.validator.UserValidator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

interface ProductsReportServiceInterface {
    Response findAll(int pageNumber, int pageSize);
    Response saveProductReport(UsersReportDto userReportDto);
    Response updateProcess(List<ReportProcessDto> reportProcessDto);
}

@Service
@RequiredArgsConstructor
public class ProductsReportService implements ProductsReportServiceInterface {

    private final ProductsReportRepository productsReportRepository;

    // Validator
    private final UserValidator userValidator;
    private final ProductValidator productValidator;

    @Override
    public Response findAll(int pageNumber, int pageSize) {
        Response response = new Response(200, "이상 신고 목록 관리 페이지 이동 성공");
        Pageable pageable = PageRequest.of(Math.max(0, pageNumber - 1), pageSize);
        Page<ProductsReport> reportsPage = productsReportRepository.findAll(pageable);
        Map<String, Object> map = new HashMap<>();
        map.put("rpts", reportsPage.stream()
                        .map(productsReport -> {
                            Products products = productsReport.getProducts();
                            Locker locker = productsReport.getLocker();
                            LockerBody lockerBody = locker.getBody();
                            Users user = productsReport.getUser();
                            ProductStatus status = productsReport.getProductStatus();
                            return ProductsReportDto.builder()
                                    .rptId(productsReport.getRptId())
                                    .productId(products.getProductId())
                                    .productNm(products.getProductNm())
                                    .bodyId(lockerBody.getLockerBodyId())
                                    .lockerId(locker.getLockerId())
                                    .lockerLoc(
                                            String.format(
                                                    "%d연 %d단",
                                                    locker.getLockerColumn(),
                                                    locker.getLockerRow()
                                            )
                                    )
                                    .userNm(user.getUserNm())
                                    .productCnt(productsReport.getProductCnt())
                                    .rptContent(productsReport.getRptContent())
                                    .rptDt(productsReport.getRptDt())
                                    .rptImg(productsReport.getRptImg())
                                    .isProcessed(productsReport.getIsProcessed())
                                    .statusId(status.getStatusId())
                                    .build();
                        })
                .collect(Collectors.toList())
        );
        map.put("pages", PageInfoDto.builder()
                .curPg(reportsPage.getNumber() + 1)
                .totalPg(reportsPage.getTotalPages())
                .totalReqs(reportsPage.getTotalElements())
                .build()
        );
        response.setData(map);
        return response;
    }

    @Override
    public Response saveProductReport(UsersReportDto userReportDto) {

        // 사용자 관련 입력 검사
        userValidator.validateUserId(userReportDto.getUserId());

        // 물품 관련 입력 검사
        productValidator.validateProductCount(userReportDto.getProductCnt());

        productValidator.validateProductStatus(userReportDto.getStatusId());

        Response response = new Response(200, "이상 신고 등록 완료");
        productsReportRepository.save(new ProductsReport(userReportDto));
        return response;
    }

    @Override
    @Transactional
    public Response updateProcess(List<ReportProcessDto> reportProcessDtoList) {
        Response response = new Response(200, "이상 처리 완료");
        for (ReportProcessDto report : reportProcessDtoList) {
            ProductsReport productsReport = productsReportRepository.findById(report.getRptId())
                    .orElseThrow();
            productsReport.setIsProcessed(report.getIsProcessed());
        }
        return response;
    }
}
