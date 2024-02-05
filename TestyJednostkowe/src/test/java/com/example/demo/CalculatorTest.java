package com.example.demo;

import org.junit.jupiter.api.Test;
import org.mockito.internal.util.reflection.Whitebox;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class CalculatorTest {
    Calculator calculator = new Calculator();

    @Test
    void sumTest() {
        int sum = calculator.sum(2, 2);
        assertEquals(4, sum);
    }

    @Test
    void subTest() {
        int sub = calculator.sub(2, 2);
        assertEquals(0, sub);
        assertTrue(sub > -1);
    }

    @Test
    void fibiTest() {
//        calculator.fibonacci = new Fibonacci(); // Nie do końca prawidłowe - działa tylko przy polu public
        List<Integer> integers = calculator.fibonacci(10);
        assertEquals(12, integers.size()); // Przez @Autowired nie działa
    }

    @Test
    void fibiTest1() {
        Whitebox.setInternalState(calculator, "fibonacci", new Fibonacci());
        List<Integer> integers = calculator.fibonacci(10);
        assertEquals(12, integers.size());
    }
}
