import { createClient } from '@supabase/supabase-js';

// Config from test-supabase.js (User's Project)
const SUPABASE_URL = 'https://pfrnbtvoqjansyapnqvc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmcm5idHZvcWphbnN5YXBucXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyODk1NDYsImV4cCI6MjA4Mzg2NTU0Nn0.WOQ7xPJOxHhitlJHqrp6gEDS5N03xE-x75mbwe8xpe8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("👻 Ghost Hardware: STARTING...");
console.log(">> Connecting to Supabase...");

async function startSimulation() {
    // 1. Auto-fetch a valid Branch ID
    const { data: branches, error } = await supabase.from('branches').select('id, name').limit(1);

    if (error || !branches || branches.length === 0) {
        console.error("❌ CRITICAL ERROR: Could not find any branches in the DB.");
        console.error(">> Did you run the SQL Schema for Phase 1?");
        console.error(">> Error details:", error ? error.message : 'No data');
        process.exit(1);
    }

    const BRANCH_ID = branches[0].id;
    const BRANCH_NAME = branches[0].name;

    console.log(`✅ Connected! Simulating Hardware for: ${BRANCH_NAME} (${BRANCH_ID})`);
    console.log(">> Press CTRL+C to stop.");

    // SIMULATION LOOP
    setInterval(async () => {
        // 1. Generate Fake Diesel Level (fluctuates between 60% and 90%)
        const dieselLevel = Math.floor(60 + Math.random() * 30); 

        // 2. Generate Fake Temp (fluctuates between -18 and -20)
        const temp = -18 + (Math.random() * 2);

        // 3. Generate Fake Sales (Random small sales)
        const saleAmount = Math.random() > 0.7 ? Math.floor(1500 + Math.random() * 5000) : 0;

        console.log(`📡 Pushing Data: Diesel=${dieselLevel}%, Temp=${temp.toFixed(1)}C ${saleAmount > 0 ? `, Sale=₦${saleAmount}` : ''}`);

        const payload = [
            { branch_id: BRANCH_ID, sensor_type: 'diesel', value: dieselLevel },
            { branch_id: BRANCH_ID, sensor_type: 'temp_cold', value: temp }
        ];

        if (saleAmount > 0) {
            payload.push({ branch_id: BRANCH_ID, sensor_type: 'sales', value: saleAmount });
            payload.push({ branch_id: BRANCH_ID, sensor_type: 'new_order', value: 1 });
        }

        const { error: insertError } = await supabase
            .from('sensor_logs')
            .insert(payload);

        if (insertError) console.error("❌ Error sending:", insertError.message);

    }, 3000); // Sends data every 3 seconds
}

startSimulation();
