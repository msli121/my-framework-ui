package com.paper.server.system.exception;

import com.paper.server.business.dto.ApiResult;
import com.paper.server.business.exception.BusinessException;
import lombok.extern.log4j.Log4j2;
import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@ControllerAdvice
@Log4j2
@ResponseBody
public class GlobalControllerExceptionHandler {

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public void uploadExceptionHandler(MaxUploadSizeExceededException e, HttpServletResponse response)
            throws IOException {
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        out.write("上传文件大小超出限制");
        out.flush();
        out.close();
    }


    @ExceptionHandler(value = BusinessException.class)
    public ApiResult sysBaseExceptionHandler(BusinessException e) {
        log.error(e.getMessage(), e);
        return ApiResult.F(e.getErrorCode(), e.getMessage());
    }

    @ExceptionHandler(value = Exception.class)
    public ApiResult globalDefaultExceptionHandler(Exception e) {
        String message = null;

        if (e instanceof IllegalArgumentException) {
            message = "参数错误";
        }

        if (e instanceof MethodArgumentNotValidException) {
            message = ((MethodArgumentNotValidException) e).getBindingResult().getFieldError().getDefaultMessage();
        }

        if (e instanceof UnauthorizedException) {
            message = "权限认证失败";
        }
        return ApiResult.F(message);
    }
}
