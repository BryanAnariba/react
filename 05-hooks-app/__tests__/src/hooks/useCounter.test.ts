import { act, renderHook } from "@testing-library/react";
import { useCounter } from "../../../src/hooks/useCounter";

describe("Tests in useCounter.ts", () => {
  test("Should to return default values.", () => {
    const { result } = renderHook(() => useCounter());
    const { counter, handleCounter } = result.current;
    expect(counter).toBe(1);
    expect(handleCounter).toEqual(expect.any(Function));
  });

  test("Should to return the counter with value 100, if i called the counter with 100 by props.", () => {
    const counterValue: number = 100;
    const { result } = renderHook(() => useCounter(counterValue));
    const { counter } = result.current;
    expect(counter).toBe(counterValue);
  });

  test("Should to increment the counter.", () => {
    const counterValue: number = 100;
    const { result } = renderHook(() => useCounter(counterValue));
    const { counter, handleCounter } = result.current;

    // Para uso de hooks como useState debe englobarse en act
    act(() => {
      handleCounter("@increment");
    });

    // Y se usa el result debido a que el counter no se actualiza el de arriba va
    expect(result.current.counter).toBe(101);
  });

  test("Should to decrement the counter.", () => {
    const counterValue: number = 10;
    const { result } = renderHook(() => useCounter(counterValue));
    const { handleCounter } = result.current;
    act(() => {
      handleCounter("@decrement");
    });
    expect(result.current.counter).toBe(counterValue - 1);
  });

  test("Should to reset the counter.", () => {
    const counterValue: number = 1;
    const { result } = renderHook(() => useCounter(counterValue));
    const { handleCounter } = result.current;
    act(() => {
      handleCounter('@increment');
    });
    act(() => {
      handleCounter('@reset');
    });
    expect(result.current.counter).toBe(counterValue);
  });
});
