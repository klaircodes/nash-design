import { useState } from 'react';
import Auth from './screens/Auth.jsx';

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) return <Auth onDone={setUser} />;

  return (
    <div style={{ display:'grid', placeItems:'center', height:'100%', gap:8 }}>
      <div style={{ textAlign:'center' }}>
        <h1 style={{ fontSize:24, fontWeight:600 }}>Signed in as {user.name}</h1>
        <p style={{ color:'var(--t3)', fontSize:13, marginTop:6 }}>
          Shell and chat land in the next increment.
        </p>
      </div>
    </div>
  );
}
