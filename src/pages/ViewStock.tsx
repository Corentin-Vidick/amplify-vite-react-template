// src/pages/ViewStock.tsx
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { Link, useNavigate } from 'react-router-dom';


const client = generateClient<Schema>();

function ViewStock() {
  const [inventory, setInventory] = useState<Array<Schema['Todo']['type']>>([]);

  useEffect(() => {
    // For now, we'll use the existing Todo model
    // We'll modify this later to use a proper Stock model
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setInventory([...data.items]),
    });
  }, []);

  return (
    <div>
      <h1>Current Stock Levels</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Item</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {item.content}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => client.models.Todo.delete({ id: item.id })}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewStock;
