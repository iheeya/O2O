package com.one.o2o.controller;

import com.one.o2o.config.JwtToken;
import com.one.o2o.config.SecurityConfig;
import com.one.o2o.dto.MemberDto;
import com.one.o2o.dto.SignInDto;
import com.one.o2o.dto.common.Response;
import com.one.o2o.entity.MemberEntity;
import com.one.o2o.entity.User;
import com.one.o2o.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder; // PasswordEncoder 주입

    /**
     * 회원 등록하는 코드
     *
     * @param memberDto
     * @return ResponseEntity 성공 : true, 실패 : false
     */
    @PostMapping("/regist")
    public ResponseEntity<?> registMember(@RequestBody MemberDto memberDto){
        log.info("memberDto : " + memberDto);
        memberDto.setIsActive(true);
        memberDto.setIsAdmin(false);
        MemberEntity memberEntity = MemberEntity.toEntity(memberDto);
        // 여기 Entity에서 Dto를 통해서 만드는걸로!
        log.info("전~~~");
        log.info("memberEntity : " + memberEntity);

        // 비밀번호 인코딩
        String encodedPassword = passwordEncoder.encode(memberEntity.getUserPw());
        log.info("encodedPassword : " + encodedPassword);
        memberEntity.setUserPw(encodedPassword); // 인코딩된 비밀번호 설정
        log.info("후~~~");
        log.info("memberEntity : " + memberEntity);
        // 회원가입이 성공하면 return true 실패하면 false 값을 준다!
        return new ResponseEntity<>(memberService.registmember(memberEntity), HttpStatus.OK) ;
    }


    /**
     * 사용자 프로필 정보를 가져오는 코드
     * 서버에게 user-id (PK 값 1, 2, 3) 이런식의 값을 주면 사용자 프로필 정보를 get 해줌!
     *
     * @param userId
     * @return ResponsEntity
     */
    @GetMapping("/profile/{user-id}")
    public ResponseEntity<?> getMemberDetail(@PathVariable("user-id") int userId){
        // 서버에게 user-id (PK 값 1, 2, 3) 이런식의 값을 주면 사용자 프로필 정보를 get 해줌!
        return new ResponseEntity<>(memberService.searchprofile(userId) , HttpStatus.OK) ;
    }

    /**
     * 서버에게 MemberEntity를 주면 그 user-id (PK 값 1, 2, 3)에 따라 해당 사용자의 프로필 정보 변경
     * 일단은 비밀번호랑 전화번호 정도만 바꿀수 있도록 했는데 더 추가하면되긴함!!
     *
     * @param userId
     * @param memberEntity
     * @return ResponseEntity
     * @throws Throwable
     */
    @PostMapping("/profile/{user-id}/edit")
    public ResponseEntity<?> editMemberDetail(@PathVariable("user-id") int userId, @RequestBody MemberEntity memberEntity) throws Throwable {
        return new ResponseEntity<>(memberService.updateprofile(userId, memberEntity) , HttpStatus.OK) ;
    }


    @PostMapping({"/login", "/login/"})
    public Response signIn(@RequestBody SignInDto signInDto) {
        Response response = new Response(HttpStatus.OK.value(), "로그인에 성공했습니다.");
        String user_lgid = signInDto.getUser_lgid();
        String user_pw = signInDto.getUser_pw();
        JwtToken jwtToken = memberService.signIn(user_lgid, user_pw);
        log.info("request username = {}, password = {}", user_lgid, user_pw);
        log.info("jwtToken accessToken = {}, refreshToken = {}", jwtToken.getAccessToken(), jwtToken.getRefreshToken());

        MemberEntity memberentity = memberService.searchprofile_with_lgid(user_lgid);

        HashMap<String, User> map = new HashMap<>();
        MemberDto dto = MemberDto.builder().build();
        //ResponseCookigit  respnosecookie
        // 유효기간 설정!
        //쿠키로 ㅁ보낼테니 쿠키로 받아!
        return response;
    }

    @PostMapping("/testte")
    public String test(Authentication authentication){
    authentication.getAuthorities();

    System.out.println(authentication.getAuthorities());
    System.out.println(authentication.getPrincipal().toString());
    return "TYTY";
    }
}
