package com.sorune.gttapiserver.member.repository;

import com.sorune.gttapiserver.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByUserId(String userId);
    Member findByNick(String nick);
    Member findByUserIdAndPassword(String userId, String password);
    Member findByEmail(String email);
    Member findByPhone(String phone);
    Member findByUserIdOrEmailOrPhone(String userId, String email, String phone);


    @EntityGraph(attributePaths = {"roles"})
    @Query("select m from Member m where m.userId = :userId or m.email = :userId")
    Member getWithRoles(@Param("userId") String userId);

}
