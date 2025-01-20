export async function createEntry(data: { content: string; mood: number }) {
    const response = await fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create entry');
    }
    return response.json();
  }
  
  export async function getEntries() {
    const response = await fetch('/api/entries');
    if (!response.ok) {
      throw new Error('Failed to fetch entries');
    }
    return response.json();
  }