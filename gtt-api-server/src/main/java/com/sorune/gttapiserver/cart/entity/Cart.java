package com.sorune.gttapiserver.cart.entity;

import com.sorune.gttapiserver.common.entity.BaseEntity;
import com.sorune.gttapiserver.lolAPI.entity.ServerMatch;
import com.sorune.gttapiserver.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString(exclude = "data")
@DynamicInsert
@DynamicUpdate
public class Cart extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cno;

    @ManyToOne
    @JoinColumn(name = "server_match_id")
    private ServerMatch matchData;

    private String stadium;

    @ColumnDefault("0")
    private int totalPrice;

    private Long userNo;

    private String phone;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> data;

}
