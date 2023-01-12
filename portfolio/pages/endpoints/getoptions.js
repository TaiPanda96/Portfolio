export default async function getoptions(symbol) {
    const response = await fetch(`http://localhost:8000/api/options/get-options?symbol=${symbol}`, {
        headers: { 'Accept': 'application/json'}
    });
    const data = await response.json();
    return data;
}

// Path: portfolio/pages/endpoints/getpricedoptions.js
