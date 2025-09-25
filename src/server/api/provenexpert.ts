// server/api/provenexpert.ts
export default defineEventHandler(async () => {
  try {
    const response = await $fetch(
      "https://www.provenexpert.com/api/v1/rating/summary/get",
      {
        headers: {
          Authorization: `Bearer ${process.env.PROVENEXPERT_API_KEY}`, // <-- API-Key in .env
        },
      }
    );

    return response;
  } catch (error) {
    console.error("ProvenExpert API Error:", error);
    return { ratingValue: null, reviewCount: null };
  }
});
