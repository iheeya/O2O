package com.one.o2o.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.reactive.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@ComponentScan
public class SecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                // REST API이므로 basic auth 및 csrf 보안을 사용하지 않음
                .httpBasic((httpConfig) ->
                        httpConfig.disable())
                .csrf((csrfConfig) ->
                        csrfConfig.disable())
                // JWT를 사용하기 때문에 세션을 사용하지 않음
                //.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )


                .authorizeHttpRequests(auth -> auth
                        // 정적 리소스 처리 - 1
                        .requestMatchers("/favicon.ico").permitAll()
                        .requestMatchers("/static/**", "/public/**").permitAll()
                        // 해당 API에 대해서는 모든 요청을 허가
                        .requestMatchers("/users/login","/users/login/","/users/regist","**","*","**/**","*/*","/users/**").permitAll()
                        // USER 권한이 있어야 요청할 수 있음
                        //.requestMatchers("").hasRole("USER")
                        // 이 밖에 모든 요청에 대해서 인증을 필요로 한다는 설정
                        .anyRequest().authenticated()
                )
                // JWT 인증을 위하여 직접 구현한 필터를 UsernamePasswordAuthenticationFilter 전에 실행
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class).build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCrypt Encoder 사용
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


//    public void configure(WebSecurity web) throws Exception {
////        web.ignoring().mvcMatchers("/favicon.ico");
//        web.ignoring().requestMatchers(String.valueOf(PathRequest.toStaticResources().atCommonLocations()));
//    }

}