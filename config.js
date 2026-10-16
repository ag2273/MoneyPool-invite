// Public Supabase endpoint and publishable (anon) key.
//
// The publishable key is safe to expose: it is designed to ship inside client
// applications, it is already bundled into the mobile app, and it grants
// nothing beyond what row level security allows. This page only calls the
// `invite_preview` function, which is the one function granted to `anon`.
window.MONEYPOOL_CONFIG = {
  supabaseUrl: 'https://kpybgywbysqzmddeynol.supabase.co',
  anonKey: 'sb_publishable_1WI_WlHlPVqhQ6E7CryG9A_yadvdz10',
};
