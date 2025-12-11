const REPLICATE_API_KEY = "REPLICATE_API_KEY_را_اینجا_بزار";

export async function generateImage(prompt) {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${REPLICATE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version:
        "5c38e9dd70d58a3c2b7f3f3fb5fa6a0a9d4df3b6f054b022cb35c0a1a8c9c125", // Stable Diffusion XL
      input: {
        prompt,
        width: 1024,
        height: 1024,
      },
    }),
  });

  const result = await response.json();

  // گرفتن URL نهایی
  let finalImage = null;

  // بررسی نتیجه
  if (result && result.urls && result.urls.get) {
    const checkUrl = result.urls.get;

    let done = false;
    while (!done) {
      const statusRes = await fetch(checkUrl, {
        headers: {
          "Authorization": `Token ${REPLICATE_API_KEY}`,
        },
      });

      const statusJson = await statusRes.json();

      if (statusJson.status === "succeeded") {
        finalImage = statusJson.output[0];
        done = true;
      } else if (statusJson.status === "failed") {
        throw new Error("ساخت تصویر شکست خورد");
      } else {
        await new Promise((res) => setTimeout(res, 2000));
      }
    }
  }

  return finalImage;
}
