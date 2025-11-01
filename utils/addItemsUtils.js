export function calculateExpiryDate(harvestDate, category) {
  const date = new Date(harvestDate); // harvestDate should be a Date object
  let daysToAdd = 0;

  if (category === "fruits") daysToAdd = 10;
  else if (category === "grains") daysToAdd = 20;
  else if (category === "oilseeds") daysToAdd = 30;

  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString().split("T")[0];
}

export function calculateStatus(batch) {
  const today = new Date();
  const harvest = new Date(batch.harvest_date);
  const expiry = new Date(batch.expiry_date);

  if (!batch.qty || batch.qty <= 0) return "Sold Out";

  const totalDays = (expiry - harvest) / (1000 * 60 * 60 * 24);
  const remainingDays = (expiry - today) / (1000 * 60 * 60 * 24);

  const percentLeft = (remainingDays / totalDays) * 100;

  if (percentLeft <= 20) return "Nearly Expired";
  if (percentLeft >= 60) return "Fresh";
  return "Expiring Soon";
}


export function updateSoldQuantity(batch, newSoldQty) {
  const remainingQty = batch.qty - newSoldQty;
  let status = "Available";

  if (remainingQty <= 0) status = "Sold Out";
  else {
    // optionally, calculate expiry-based status if you have expiryDate
    const totalDays = (new Date(batch.expiry_date) - new Date(batch.harvest_date)) / (1000 * 60 * 60 * 24);
    const daysLeft = (new Date(batch.expiry_date) - new Date()) / (1000 * 60 * 60 * 24);
    const percentLeft = (daysLeft / totalDays) * 100;
    if (percentLeft <= 20) status = "Expiring Soon";
    else status = "Available";
  }

  return {
    ...batch,
    sold_qty: newSoldQty,
    status,
  };
}
