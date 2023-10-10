import { testes } from "../../../lib/utils";

/**
 * distancia: number, number, number, number -> number
 * Calcula a distância euclidiana entre os dois pontos
 */
export function distancia(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
testes(() => {
  describe("testes distancia", () => {
    test("teste 1", () => {
      expect(distancia(0, 0, 3, 4)).toStrictEqual(5);
    });
    test("teste 2", () => {
      expect(distancia(1, 2, 4, 6)).toStrictEqual(5);
    });
  });
});
