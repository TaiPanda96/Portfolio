export default async function getstory() {
    const response = await fetch(`http://localhost:8000/api/story/get-story`, {
        headers: { 'Accept': 'application/json'}
    });
    const data = await response.json();
    return data;
}
