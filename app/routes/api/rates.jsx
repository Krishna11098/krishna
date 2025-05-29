import { json } from "@remix-run/node";
import { getConfig } from "~/lib/configStore";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const origin = url.searchParams.get("origin");
  const destination = url.searchParams.get("destination");
  const weight = url.searchParams.get("weight");
  const length = url.searchParams.get("length");
  const width = url.searchParams.get("width");
  const height = url.searchParams.get("height");

  const config = getConfig();

  if (!origin || !destination || !weight || !config.accessKey || !config.secretKey) {
    return json({ error: "Missing required parameters or config" }, { status: 400 });
  }

  const body = {
    origin,
    destination,
    weight: Number(weight),
    length: Number(length || 1),
    width: Number(width || 1),
    height: Number(height || 1),
  };

  try {
    const res = await fetch("https://b2b-api-stg.fastrac.id/apiTariff/tariffExpress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-key": config.accessKey,
        "x-secret-key": config.secretKey,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    const selectedServices = [];

    for (const category of ["sameday", "nextday", "regular", "cargo"]) {
      if (config.couriers?.[category] && data[category]) {
        for (const courier of data[category]) {
          selectedServices.push({
            service_name: courier.service,
            courier_name: courier.courier,
            description: `${courier.etd} - ${courier.total_cost}`,
            cost: parseFloat(courier.total_cost),
          });
        }
      }
    }

    return json({ rates: selectedServices });
  } catch (err) {
    return json({ error: "Failed to fetch rates from Fastrac" }, { status: 500 });
  }
};
