package com.sorune.gttapiserver.cart.service;

import com.sorune.gttapiserver.cart.DTO.CartDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {

    public List<CartDTO> findById(Long id);
    public List<CartDTO> findAll();
    public Long save(CartDTO cartDTO);


}
