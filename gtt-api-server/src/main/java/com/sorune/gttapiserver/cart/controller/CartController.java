package com.sorune.gttapiserver.cart.controller;

import com.sorune.gttapiserver.cart.DTO.CartDTO;
import com.sorune.gttapiserver.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/cart")
@PreAuthorize("hasAnyRole('ROLE_USER','ROLE_MANAGER','ROLE_ADMIN')")
public class CartController {

    private final CartService cartService;

    @GetMapping("/")
    public List<CartDTO> getAll(){
        return cartService.findAll();
    }

    @GetMapping("/{userNo}")
    public List<CartDTO> get(@PathVariable("userNo") Long userNo){
        return cartService.findById(userNo);
    }

    @PostMapping("/")
    public ResponseEntity<Map<String,String>> save(@RequestBody CartDTO cartDTO){
        log.info(cartDTO.toString());
        try {
            cartService.save(cartDTO);
            return ResponseEntity.ok(Map.of("result", "SUCCESS"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("result", "FAILURE", "message", e.getMessage()));
        }
    }


}
