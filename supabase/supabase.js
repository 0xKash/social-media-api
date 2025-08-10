require("dotenv").config();

// imports
const { createClient } = require("@supabase/supabase-js");

// setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.updateAvatar = async (userId, avatarFile) => {
  const { error } = await supabase.storage
    .from("avatars")
    .update(`userid_${userId}/avatar${userId}`, avatarFile, {
      contentType: "image/png",
      upsert: true,
    });

  if (error) throw error;

  const { data } = await supabase.storage
    .from("avatars")
    .getPublicUrl(`userid_${userId}/avatar${userId}`);

  return { data, error };
};
