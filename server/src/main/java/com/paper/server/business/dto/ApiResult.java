package com.paper.server.business.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class ApiResult implements Serializable {

    private static final long serialVersionUID = 1L;

    private String flag;
    private String code;
    private String msg;
    private Object data;

    public ApiResult(String flag, String code, String msg, Object data) {
        this.flag = flag;
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public static ApiResult newInstance(String flag, String code, String msg, Object data){
        ApiResult apiResult = new ApiResult(flag, code, msg, data );
        return apiResult;
    }
    public static ApiResult newInstance(String flag, String code, String msg){
        return newInstance(flag, code, msg, null);
    }
    public static ApiResult T(){
        return newInstance("T", "", "", null);
    }
    public static ApiResult T(Object data){
        return newInstance("T", "", "", data);
    }

    public static ApiResult T(String code, String msg){
        return newInstance("T", code, msg, null);
    }

    public static ApiResult T(String code, String msg, Object data) {
        return newInstance("T", code, msg, data);
    }
    public static ApiResult F(){
        return newInstance("F", "", "", null);
    }
    public static ApiResult F(String errorInfo){
        return newInstance("F", "", errorInfo, null);
    }
    public static ApiResult F(String errorCode, String errorInfo){
        return newInstance("F", errorCode, errorInfo, null);
    }

}
