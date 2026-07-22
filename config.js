// ⚠️ 把下面兩個值換成你自己 Supabase 專案的資訊
// 到 supabase.com 建立專案後，在 Project Settings → API 頁面可以找到
const SUPABASE_URL = 'https://xrzxfkhmsjcqdwitxsgg.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'sb_publishable_vNDtfPXsGxOoWbWyL9Fgdw_h_SMqrjh';

// anon public key 設計上就是給前端公開使用的，不是機密資訊，
// 真正的存取控制要靠 Supabase 後台的 Row Level Security (RLS) 規則。
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
