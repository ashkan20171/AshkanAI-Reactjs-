export async function mockStream({ signal, text, onToken, min = 35, max = 75 }) {
  let i = 0;

  const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

  // chunk size in characters (bigger chunks but slower delay feels more natural)
  while (i < text.length) {
    if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

    const step = Math.min(rand(4, 10), text.length - i);
    onToken(text.slice(i, i + step));
    i += step;

    await new Promise((r) => setTimeout(r, rand(min, max)));
  }
}
