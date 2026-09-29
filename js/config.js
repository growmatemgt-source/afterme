const SUPABASE_URL = "https://bbbrupbaiawaiyzwjkiv.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_TTSvKkftSKg8RrMf4VXWSQ_Ct5rHY_H";


if (typeof supabase === "undefined") {

    console.error(
        "Supabase library failed to load."
    );

} else {

    window.aftermeSupabase =
        supabase.createClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY
        );

}