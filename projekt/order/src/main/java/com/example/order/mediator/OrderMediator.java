package com.example.order.mediator;

import com.example.order.entity.Order;
import com.example.order.entity.OrderDTO;
import com.example.order.entity.Response;
import com.example.order.exception.BadSignatureException;
import com.example.order.exception.OrderDontExistException;
import com.example.order.service.OrderService;
import com.example.order.service.SignatureValidator;
import com.example.order.translators.OrderDTOToOrder;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.security.NoSuchAlgorithmException;

@Component
@RequiredArgsConstructor
public class OrderMediator {
    private final OrderDTOToOrder orderDTOToOrder;
    private final OrderService orderService;
    private final SignatureValidator signatureValidator;

    public ResponseEntity<?> createOrder(OrderDTO orderDTO, HttpServletResponse response, HttpServletRequest request) {
        Order order = orderDTOToOrder.toOrder(orderDTO);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, "application/json");
        return ResponseEntity.status(200).headers(headers).body(orderService.createOrder(order, request, response));
    }

    public ResponseEntity<Response> handleNotify(com.example.order.entity.notify.Notify notify, HttpServletRequest request) {
        String header = request.getHeader("OpenPayu-Signature");
        try {
            signatureValidator.validate(header,notify);
            orderService.completeOrder(notify);
        } catch (NoSuchAlgorithmException | JsonProcessingException | BadSignatureException e) {
            return ResponseEntity.badRequest().body(new Response("Bad signature"));
        }catch (OrderDontExistException e1){
            return ResponseEntity.badRequest().body(new Response("Order don't exist"));
        };
        return ResponseEntity.ok(new Response("Notification handle success"));

    }

}
