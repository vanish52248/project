package com.example.api;

import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Assertions;


@SpringBootTest
class CalcTest {

	@Test
	void calcMultiplicationTest() {
		/**
		 * 正常系(乗算)
		 * @param: 10, 20
		 * @return: 200 
		 * @throw: nothing
		 */		
		Calc calc = new Calc();
		int x = 10;
		int y = 20;
		assertEquals(calc.multiplication(x, y), 200);
	}

	@Test
	void zeroDivisionErrorTest() {
		/**
		 * 異常系(除算)
		 * @param: 5, 0
		 * @return: nothing 
		 * @throw: ArithmeticException(０での除算時のエラー)
		*/		
		Calc calc = new Calc();
		Assertions.assertThrows(ArithmeticException.class, () -> calc.zeroDivisionError(5, 0));
	}
}
