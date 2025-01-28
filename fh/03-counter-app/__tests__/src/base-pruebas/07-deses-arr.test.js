import { returnArray } from "../../../src/base-pruebas/07-deses-arr";

describe('Testing in ./src/base-pruebas/07-deses-arr.js', () => {
  test('returnArray() should return an string field in the first position and number field in the second array position', () => {
    const [letters, numbers] = returnArray();
    expect(letters).toEqual(expect.any(String));
    // expect(letters).toBe("ABC");
    expect(numbers).toBe(123);
    expect(typeof letters).toBe("string");
    expect(typeof numbers).toBe("number");
  });
}); 