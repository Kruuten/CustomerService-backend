package com.kruten.backend;

import com.kruten.backend.service.ServiceTest;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = {ServiceTest.class})
class AppTest {
    @Test
    void contextLoads() {
    }
}
