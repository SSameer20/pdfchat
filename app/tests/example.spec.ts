import { test, expect } from "@playwright/test";

test("Addition Cases", () => {
  const number1 = 200;
  const number2 = 300;
  const sum = number1 + number2;
  expect(sum).toBe(500);
});

test("Addition Cases 1", () => {
  const number1 = 200;
  const number2 = 300;
  const sum = number1 + number2;
  expect(sum).not.toBe(600);
});
