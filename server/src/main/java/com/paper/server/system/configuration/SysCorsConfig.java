package com.paper.server.system.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @Description
 * @Author msli
 * @Date 2021/01/13
 */

@Configuration
public class SysCorsConfig implements WebMvcConfigurer {

    /**
     * 开启跨域
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 设置允许跨域的路由
        registry.addMapping("/**")
                // 设置允许跨域请求的域名
                .allowedOriginPatterns("*")
//                .allowedOrigins("http://localhost:8080")
                // 是否允许证书（cookies）
                .allowCredentials(true)
                // 设置允许的方法
                .allowedMethods("GET", "POST", "DELETE", "PUT" , "OPTIONS")
                // 跨域允许时间
                .maxAge(3600);
    }

//    @Override
//    public void addViewControllers( ViewControllerRegistry registry ) {
//        registry.addViewController( "/" ).setViewName( "forward:/index.html" );
//        registry.setOrder( Ordered.HIGHEST_PRECEDENCE );
//    }
}
