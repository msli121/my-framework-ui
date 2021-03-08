package com.paper.server.system.utils;

import java.util.Random;

/**
 * @Description
 * @Author msli
 * @Date 2021/01/13
 */

public class SysStringUtils {
    /**
     * 生成指定长度随机字符串
     * @param length
     * @return
     */
    public static String getRandomString(int length) {
        String base = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZ";
        Random random = new Random();
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < length; i++) {
            int number = random.nextInt(base.length());
            sb.append(base.charAt(number));
        }
        return sb.toString();
    }
}
