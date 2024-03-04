package com.example.order.controller;

import com.example.order.entity.DeliverDTO;

import com.example.order.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/deliver")
@RequiredArgsConstructor
public class DeliveryController {

    private final DeliveryService deliveryService;

    @RequestMapping(method = RequestMethod.GET)
    public List<DeliverDTO> getDeliver(){
        return deliveryService.getAllDeliver();
    }
}

