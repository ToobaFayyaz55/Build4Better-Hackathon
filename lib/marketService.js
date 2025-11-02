import { supabase } from "./supabase";

// Add a new market
export const addMarket = async (markets) => {
  try {
    const { data, error } = await supabase
      .from("markets")
      .insert([
        {
          market_name: markets.market_name,
          tags: markets.tags,
          latitude: markets.latitude,
          longitude: markets.longitude,
        },
      ])
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error("Error adding market:", error.message);
    return { success: false, error: error.message };
  }
};

// Get all markets
export const getMarkets = async () => {
  try {
    const { data, error } = await supabase
      .from("markets")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching markets:", error.message);
    return { success: false, error: error.message };
  }
};

// Update a market
export const updateMarket = async (id, markets) => {
  try {
    const { data, error } = await supabase
      .from("markets")
      .update({
        market_name: markets.market_name,
        tags: markets.tags,
        latitude: markets.latitude,
        longitude: markets.longitude,
      })
      .eq("id", id)
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error("Error updating market:", error.message);
    return { success: false, error: error.message };
  }
};

// Delete a market
export const deleteMarket = async (id) => {
  try {
    const { error } = await supabase
      .from("markets")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error deleting market:", error.message);
    return { success: false, error: error.message };
  }
};

// Subscribe to real-time market updates
export const subscribeToMarkets = (callback) => {
  const subscription = supabase
    .from("markets")
    .on("*", (payload) => {
      callback(payload);
    })
    .subscribe();

  return subscription;
};
