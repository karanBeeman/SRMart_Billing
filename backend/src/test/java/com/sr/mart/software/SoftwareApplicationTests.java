package com.sr.mart.software;

import com.sr.mart.software.repository.InvoiceItemRepository;
import com.sr.mart.software.repository.InvoiceRepository;
import com.sr.mart.software.repository.ProductRepository;
import com.sr.mart.software.repository.RoleRepository;
import com.sr.mart.software.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@SpringBootTest(properties = {
    "spring.autoconfigure.exclude="
        + "org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,"
        + "org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration"
})
@ActiveProfiles("test")
class SoftwareApplicationTests {

    @MockitoBean
    private RoleRepository roleRepository;

    @MockitoBean
    private UserRepository userRepository;

    @MockitoBean
    private ProductRepository productRepository;

    @MockitoBean
    private InvoiceRepository invoiceRepository;

    @MockitoBean
    private InvoiceItemRepository invoiceItemRepository;

    @Test
    void contextLoads() {
    }

}