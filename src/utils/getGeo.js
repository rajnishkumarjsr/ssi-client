// added on 23-Mar
export const FALLBACK_USD_TO_INR_RATE = 94;

export async function getGeoLocation() {
  try {
    const res = await fetch("https://ipinfo.io/json");
    const data = await res.json();

    return {
        // country: "US"   // testing
      country: data.country

    //   countryName: data.country_name,
    //   city: data.city,
    //   currency: data.currency,
    //   ip: data.ip
    };

  } catch (err) {
    console.error("Geo error", err);

    return {
      country: "US",
    //   countryName: "Unknown",
    //   city: "",
    //   currency: "USD",
    //   ip: ""
    };
  }
}
// added on 23-Mar

export async function getUsdToInrRate() {
  try {
    //const response = await fetch("https://api.frankfurter.app/latest?from=USD&to=INR");
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    const liveRate = Number(data?.rates?.INR);

    if (!Number.isFinite(liveRate) || liveRate <= 0) {
      throw new Error("Invalid USD to INR rate");
    }

    return liveRate;
  } catch (err) {
    console.error("USD to INR rate error", err);
    return FALLBACK_USD_TO_INR_RATE;
  }
}
