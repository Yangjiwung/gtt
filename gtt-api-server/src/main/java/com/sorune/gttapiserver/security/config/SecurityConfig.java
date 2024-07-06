package com.sorune.gttapiserver.security.config;

import com.sorune.gttapiserver.security.filter.JWTCheckFilter;
import com.sorune.gttapiserver.security.handler.APILoginFailHandler;
import com.sorune.gttapiserver.security.handler.APILoginSuccessHandler;
import com.sorune.gttapiserver.security.handler.CustomAccessDeniedHandler;
import com.sorune.gttapiserver.security.handler.CustomAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.sql.DataSource;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableMethodSecurity
@Log4j2
@RequiredArgsConstructor
public class SecurityConfig {
    private final DataSource dataSource;
    private final UserDetailsService userDetailsService;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(httpSecurityCorsConfigurer ->
                        httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sessionConfig->
                        sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorizeHttpRequests->
                        authorizeHttpRequests
                                .requestMatchers("/css/**", "/js/**", "/img/**").permitAll()
                                .requestMatchers("/api/comment/**","/api/player/**", "/api/lol/**","/api/notice/**", "/api/playercomment/**", "/api/member/**", "/api/team/**","/api/files/**","/api/team/**","/api/lol/**","/api/free/**","/api/board/**").permitAll()
                                .requestMatchers(HttpMethod.POST,"/api/playercomment/","/api/member/register","/api/files/").permitAll()
                                .requestMatchers(HttpMethod.POST,"/api/team/**","/api/cart/**").permitAll()
                                .requestMatchers(HttpMethod.PUT,"/api/playercomment/", "/api/member/**","/api/free/**","/api/board/**", "/api/lol/**").permitAll()
                                .requestMatchers( "api/news/**","/api/chat/**","/chat/**","/pub/**","/sub/**").permitAll()// "/api/chat/**" 패턴을 허용
                                .anyRequest().authenticated()
                )
                .formLogin(config-> {
                            config.loginPage("/api/member/login")
                                    .successHandler(new APILoginSuccessHandler())
                                    .failureHandler(new APILoginFailHandler());
                        })
                .addFilterBefore(new JWTCheckFilter(), UsernamePasswordAuthenticationFilter.class)
                /*.rememberMe(httpSecurityRememberMeConfigurer ->
                        httpSecurityRememberMeConfigurer
                                .tokenRepository(persistentTokenRepository())
                                .userDetailsService(userDetailsService)
                                .tokenValiditySec
                                ...
                                0onds(60*60*24*30)
                )*/
                .logout(httpSecurityLogoutConfigurer ->
                        httpSecurityLogoutConfigurer.logoutUrl("/api/member/logout"))
                .exceptionHandling(config->
                        config.accessDeniedHandler(new CustomAccessDeniedHandler())
                                .authenticationEntryPoint(new CustomAuthenticationEntryPoint()))
        ;


        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);

        //setAllowedOrigins : 교차 출처 요청이 허용되는 출처 목록입니다.
        //setAllowedMethods : 허용할 HTTP 메소드 설정
        //setAllowedHeaders : 실제 요청 중에 사용이 허용되도록 사전 요청이 나열할 수 있는 헤더 목록을 설정.
        //setAllowedCredentials : 사용자 자격 증명이 지원되는지 여부

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    @Bean // 패스워드 암호화용 코드 객체로 생성
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public PersistentTokenRepository persistentTokenRepository() {
        JdbcTokenRepositoryImpl tokenRepository = new JdbcTokenRepositoryImpl();
        tokenRepository.setDataSource(dataSource);
        return tokenRepository;
    }
}
