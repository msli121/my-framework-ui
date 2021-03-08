package com.paper.server.system.exception;

/**
 * @Description
 * @Author msli
 * @Date 2021/01/19
 */

public abstract class BaseException extends RuntimeException {

    protected String errorCode;

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    /**
     * 无参构造
     */
    public BaseException() {}

    /**
     *
     * @param message 异常信息
     */
    public BaseException(String message) {
        super(message);
    }
    /**
     *
     * @param code 异常代码
     * @param message 异常信息
     */
    public BaseException(String code, String message) {
        super(message);
        this.errorCode = code;
    }

    public BaseException(String code, String message, Throwable throwble) {
        super(message, throwble);
        this.errorCode = code;
    }

    @Override
    public String toString() {
        return String.format("Code:[%s], Description:[%s]. " , this.errorCode , this.getMessage());
    }
}
