package com.paper.server.system.utils;

import com.alibaba.fastjson.JSON;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.DnsResolver;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.impl.conn.SystemDefaultDnsResolver;
import org.apache.http.util.EntityUtils;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * @Description
 * @Author msli
 * @Date 2021/01/26
 */

public class SysHttpUtils {
    private final static Log log = LogFactory.getLog(SysHttpUtils.class);

    private static SysHttpUtils instance = null;

    public static SysHttpUtils getInstance() {
        if (instance == null) {
            instance = new SysHttpUtils();
        }
        return instance;
    }

    private RequestConfig requestConfig = RequestConfig.custom()
            .setSocketTimeout(600000)
            .setConnectTimeout(600000)
            .setConnectionRequestTimeout(600000)
            .build();

    public static void setTimeOutTime(int time) {
        if (instance != null) {
            instance.requestConfig = RequestConfig.custom()
                    .setSocketTimeout(time)
                    .setConnectTimeout(time)
                    .setConnectionRequestTimeout(time)
                    .build();
        }
    }

    /**
     * 发送 get请求 直接传URL
     * @param httpUrl
     * @return
     */
    public String sendHttpGet(String httpUrl) {
        // 创建get请求
        HttpGet httpGet = new HttpGet(httpUrl);
        return sendHttpBase(httpGet);
    }

    /**
     * 发送 get请求 URL和参数map，自动拼接到url后面
     * @param httpUrl  地址
     * @param params  参数
     * @return
     */
    public String sendHttpGet(String httpUrl, Map<String, String> params) {
        // 创建get请求
        HttpGet httpGet = new HttpGet(urlParamSplice(httpUrl, params));
        return sendHttpBase(httpGet);
    }


    /**
     * 发送 get请求 URL和参数map，自定义头部，自动拼接到url后面
     * @param httpUrl 地址
     * @param params 参数
     * @param headers 自定义头部
     * @return
     */
    public String sendHttpGet(String httpUrl, Map<String, String> params, Map<String, String> headers) {
        HttpGet httpGet = new HttpGet(urlParamSplice(httpUrl, params));// 创建get请求
        return sendHttpBase(httpGet, headers);
    }

    /**
     * 直接发送 post 请求
     * @param httpUrl 地址
     * @return
     */
    public String sendHttpPost(String httpUrl) {
        // 创建httpPost
        HttpPost httpPost = new HttpPost(httpUrl);
        return sendHttpBase(httpPost);
    }

    /**
     * 发送 post json 请求, data 为 jsonString
     * @param httpUrl
     * @param jsonString
     * @return
     */
    public String sendJsonPost(String httpUrl, String jsonString) {
        return sendJsonPost(httpUrl, jsonString, null);
    }

    /**
     * 发送 post json 请求
     * @param httpUrl
     * @param jsonString
     * @param headers
     * @return
     */
    public String sendJsonPost(String httpUrl, String jsonString, Map headers) {
        HttpPost httpPost = new HttpPost(httpUrl);// 创建httpPost
        return sendJsonPost(jsonString, headers, httpPost);
    }

    private String sendJsonPost(String jsonString, Map headers, HttpPost httpPost) {
        try {
            //设置参数
            StringEntity jsonEntity = new StringEntity(jsonString, "UTF-8");
            jsonEntity.setContentType("application/json");
            httpPost.setEntity(jsonEntity);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return sendHttpBase(httpPost, headers);
    }


    public String sendHttpBase(HttpRequestBase httpBase) {
        log.debug("请求地址httpUrl：" + httpBase.getURI().toString());
        HttpEntity entity = null;
        String responseContent = null;

        // 创建默认的httpClient实例
        //CloseableHttpClient httpClient = HttpClients.createDefault()
        try {

            Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder.<ConnectionSocketFactory>create()
                    .register("http", PlainConnectionSocketFactory.getSocketFactory())
                    .register("https", SSLConnectionSocketFactory.getSocketFactory())
                    .build();

            //DNS 解析器
            DnsResolver dnsResolver = SystemDefaultDnsResolver.INSTANCE;

            //创建池化连接管理器
            PoolingHttpClientConnectionManager connManager = new PoolingHttpClientConnectionManager(socketFactoryRegistry,dnsResolver);

            connManager.setDefaultMaxPerRoute(6);
            connManager.setMaxTotal(20);
            connManager.closeIdleConnections(120, TimeUnit.SECONDS);
            HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();

            CloseableHttpClient httpClient = httpClientBuilder.setConnectionManager(connManager).disableAutomaticRetries()
                    .build();
            httpBase.setConfig(requestConfig);
            // 执行请求
            try (CloseableHttpResponse response = httpClient.execute(httpBase)) {
                entity = response.getEntity();
                responseContent = EntityUtils.toString(entity, "UTF-8");
            } catch (Exception e) {
                log.error(e.getMessage());
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        log.debug("返回值：" + responseContent);
        return responseContent;
    }

    public String sendHttpBase(HttpRequestBase httpBase, Map<String, String> headers) {
        log.debug("请求头：" + JSON.toJSONString(headers));
        List<NameValuePair> nameValuePairs = new ArrayList<>();
        if (null != headers) {
            for (String key : headers.keySet()) {
                httpBase.setHeader(key, headers.get(key));
            }
        }
        return sendHttpBase(httpBase);
    }

    public String urlParamSplice(String httpUrl, Map<String, String> params) {
        log.debug("请求参数：" + JSON.toJSONString(params));
        Boolean firstParam = true;
        try {
            if (null != params) {
                for (String key : params.keySet()) {
                    if (firstParam) {
                        httpUrl += "?" + key + "=" + URLEncoder.encode(params.get(key), "UTF-8");
                        firstParam = false;
                    } else {
                        httpUrl += "&" + key + "=" + URLEncoder.encode(params.get(key), "UTF-8");
                    }
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return httpUrl;
    }
}
