// Deno Edge Function for Telegram
const BOT_TOKEN = "PASTE_YOUR_BOT_TOKEN_HERE";
const CHAT_ID = "PASTE_YOUR_PERSONAL_NUMERIC_ID_HERE";

Deno.serve(async (req) => {
  const { record } = await req.json();

  // LOGIC: Only alert if Diesel is < 15% or Cold Room > -5C
  let message = "";
  
  if (record.sensor_type === 'diesel' && record.value < 15) {
    message = `⚠️ CRITICAL ALERT: Generator Diesel is LOW (${record.value}%) at Branch ${record.branch_id}`;
  }
  else if (record.sensor_type === 'temp_cold' && record.value > -5) {
    message = `❄️ SPOILAGE RISK: Cold Room is WARMING UP (${record.value}°C)!`;
  }

  if (message) {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });
  }

  return new Response("Alert Checked", { headers: { "Content-Type": "application/json" } });
});
