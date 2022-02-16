package com.kruten.backend;

import com.kruten.backend.service.Service;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = {Service.class})
class AppTest {
    @Test
    void contextLoads() {
    }
}
