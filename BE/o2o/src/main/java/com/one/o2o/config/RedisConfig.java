package com.one.o2o.config;

 import org.springframework.beans.factory.annotation.Value;
 import org.springframework.context.annotation.Bean;
 import org.springframework.context.annotation.Configuration;
 import org.springframework.data.redis.connection.RedisConnectionFactory;
 import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
 import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
 import org.springframework.data.redis.core.RedisTemplate;
 import org.springframework.data.redis.serializer.StringRedisSerializer;

 /**
  * Redis 환경 설정
  *
  * @author : lee
  * @fileName : RedisConfig
  * @since : 3/29/24
  */
 @Configuration
 public class RedisConfig {

    @Value("${spring.data.redis.host}")
    private String host;

    @Value("${spring.data.redis.port}")
    private int port;

    @Value("${spring.data.redis.password}")
    private String password;

     /**
      * Redis 와의 연결을 위한 'Connection'을 생성합니다.
      *
      * @return
      */
     @Bean
     public RedisConnectionFactory redisConnectionFactory() {
         RedisStandaloneConfiguration redisConfig = new RedisStandaloneConfiguration(host, port);
         // 비밀번호는 일단 보류!!
         //redisConfig.setPassword(password);
         return new LettuceConnectionFactory(redisConfig);
     }

     /**
      * Redis 데이터 처리를 위한 템플릿을 구성합니다.
      * 해당 구성된 RedisTemplate을 통해서 데이터 통신으로 처리되는 대한 직렬화를 수행합니다.
      *
      * @return
      */
     @Bean
     public RedisTemplate<String, Object> redisTemplate() {
         RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();

         // Redis를 연결합니다.
         redisTemplate.setConnectionFactory(redisConnectionFactory());

         // Key-Value 형태로 직렬화를 수행합니다.
         redisTemplate.setKeySerializer(new StringRedisSerializer());
         redisTemplate.setValueSerializer(new StringRedisSerializer());

         // Hash Key-Value 형태로 직렬화를 수행합니다.
         redisTemplate.setHashKeySerializer(new StringRedisSerializer());
         redisTemplate.setHashValueSerializer(new StringRedisSerializer());

         // 기본적으로 직렬화를 수행합니다.
         redisTemplate.setDefaultSerializer(new StringRedisSerializer());

         return redisTemplate;
     }
 }
