package com.paper.server.system.configuration;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import static com.alibaba.fastjson.serializer.SerializerFeature.DisableCircularReferenceDetect;
import static com.alibaba.fastjson.serializer.SerializerFeature.WriteNullStringAsEmpty;

/**
 * @Description
 * @Author msli
 * @Date 2021/01/04
 */
@Configuration
public class SysWebMvcConfig implements WebMvcConfigurer {

    /**
     * 静态资源配置
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String os = System.getProperty("os.name");
        String fileRootPath = "";
        if(os.toLowerCase().startsWith("win")) {
            fileRootPath = "D:"+ File.separator+"ocr-file"+File.separator+"public"+File.separator;
        } else {
            fileRootPath = "/home/msli/wwwapps/ocr-file/public/";
        }
        File fileDir = new File(fileRootPath);
        if(!fileDir.isDirectory()) {
            fileDir.mkdirs();
        }
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");
        registry.addResourceHandler("/public/**")
                .addResourceLocations("file:" + fileRootPath);
    }

    /**
     * fast json配置
     * @param converters
     */
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        FastJsonHttpMessageConverter converter = new FastJsonHttpMessageConverter();
        FastJsonConfig config = new FastJsonConfig();
        config.setCharset(StandardCharsets.UTF_8);
        config.setDateFormat("yyyy-MM-dd HH:mm:ss");
        config.setSerializerFeatures(
                SerializerFeature.WriteMapNullValue,
                SerializerFeature.WriteNullListAsEmpty,
                SerializerFeature.PrettyFormat,
                WriteNullStringAsEmpty,
                // 关闭重复引用和循环引用，可能带来stackOverFlow风险
                DisableCircularReferenceDetect
        );
        converter.setFastJsonConfig(config);

        // 处理fastJson乱码
        List<MediaType> fastMediaType = new ArrayList<>();
        fastMediaType.add(MediaType.APPLICATION_JSON_UTF8);
        converter.setSupportedMediaTypes(fastMediaType);

        converters.add(converter);
    }
}
