async function testEndpoints() {
    const endpoints = [
        'https://leetcode-stats-api.herokuapp.com/NaniSontyana',
        'https://alfa-leetcode-api.onrender.com/NaniSontyana/solved',
        'https://leetcode-api-faisalshohag.vercel.app/NaniSontyana',
        'https://alfa-leetcode-api.onrender.com/userProfile/NaniSontyana'
    ];

    for (const ep of endpoints) {
        try {
            console.log(`\nTesting ${ep}...`);
            const res = await fetch(ep);
            if (!res.ok) {
                console.log(`Status: ${res.status} ${res.statusText}`);
                continue;
            }
            const data = await res.json();
            console.log("Response:", JSON.stringify(data).slice(0, 300));
        } catch (e) {
            console.log("Error:", e.message);
        }
    }
}
testEndpoints();
