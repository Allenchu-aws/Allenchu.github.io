# 重量科學 — 多頁面版本

## 檔案結構

```
index.html       首頁（導向其他三頁）
calculator.html  計算機（BMR/TDEE/巨量營養素）
foodlog.html     飲食紀錄（串接 Supabase）
knowledge.html   公式原理文章
style.css        共用樣式
config.js        Supabase 連線設定（要自己填）
```

## Step 1：建立 Supabase 專案

1. 到 [supabase.com](https://supabase.com) 免費註冊
2. 建立新專案（New project），選一個資料庫密碼記下來即可，之後用不太到
3. 等 1-2 分鐘專案建置完成

## Step 2：建立資料表

進專案後，左側選單 **SQL Editor** → **New query**，貼上這段執行：

```sql
create table diet_logs (
  id uuid primary key default gen_random_uuid(),
  log_date date not null,
  name text not null,
  calories numeric not null,
  protein numeric default 0,
  carb numeric default 0,
  fat numeric default 0,
  created_at timestamptz default now()
);

-- 開啟 Row Level Security
alter table diet_logs enable row level security;

-- 允許所有人讀寫（個人專案先簡化這樣做；
-- 如果之後要多人使用、互相看不到彼此資料，要改成搭配帳號驗證的規則）
create policy "public access" on diet_logs
  for all
  using (true)
  with check (true);
```

按 **Run**，跑完沒有紅字錯誤就代表資料表建好了。

再貼上這段建立「常用食物」資料表（快速新增功能要用）：

```sql
create table favorite_foods (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  calories numeric not null,
  protein numeric default 0,
  carb numeric default 0,
  fat numeric default 0,
  created_at timestamptz default now()
);

alter table favorite_foods enable row level security;

create policy "public access" on favorite_foods
  for all
  using (true)
  with check (true);
```

⚠️ 這個設定是「任何拿到你的 URL/anon key 的人都能讀寫這張表」，對單純個人記錄用途沒問題，但不要放進真正機密的資料。之後如果想加「登入才能看到自己的紀錄」，要接 Supabase Auth，屆時再回來調整這條 policy。

## Step 3：填入連線資訊

1. 專案左側選單 **Project Settings** → **API**
2. 複製 **Project URL** 和 **anon public** 這組 key
3. 打開 `config.js`，把裡面兩個值換成你剛複製的：

```js
const SUPABASE_URL = 'https://你的專案.supabase.co';
const SUPABASE_ANON_KEY = '你複製的anon key';
```

## Step 4：部署到 GitHub Pages

把這整個資料夾（`index.html`、`calculator.html`、`foodlog.html`、`knowledge.html`、`style.css`、`config.js` 全部）上傳到你的 `allenchu-aws.github.io` repo（取代原本單一那個檔案），設定跟之前一樣不用改，`index.html` 會自動變成首頁。

## 這版新增了什麼

- **本週熱量攝取總覽**：飲食紀錄頁最上面會顯示過去 7 天（含當前選的日期）每天總熱量的長條圖，紅色代表超過目標、橘色是今天，並顯示 7 日平均。
- **常用食物快選**：填好表單後按 ⭐ 存成常用食物，之後點一下 chip 就會把名稱/熱量/營養素自動帶入表單，不用每次都重新輸入。

## 之後想擴充

- 想要「登入才能看自己的紀錄」→ 接 Supabase Auth（Email 或 Google 登入都支援）
- 想要「歷史趨勢圖」→ `foodlog.html` 目前只顯示單日，之後可以加一個查詢一段區間的圖表
- 想要「體脂率估算」→ 可以在 `calculator.html` 再加一個公式區塊
