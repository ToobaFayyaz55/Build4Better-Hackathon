export const crops = [
  { id: 1, user_id: 1, crop_name: "Tomatoes", unit_type: "crates" },
  { id: 2, user_id: 1, crop_name: "Potatoes", unit_type: "kg" },
  { id: 3, user_id: 1, crop_name: "Spinach", unit_type: "kg" },
];


export const crop_batches = [
  { id: 1, crop_id: 1, qty: 20, harvest_date: "2025-10-15", expiry_date: "2025-11-05", sold_qty: 5, status: "Available" },
  { id: 2, crop_id: 2, qty: 100, harvest_date: "2025-10-10", expiry_date: "2025-11-20", sold_qty: 80, status: "Expiring Soon" },
  { id: 3, crop_id: 3, qty: 40, harvest_date: "2025-10-25", expiry_date: "2025-11-10", sold_qty: 40, status: "Sold Out" },
];