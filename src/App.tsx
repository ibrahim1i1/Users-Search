import { useEffect, useState } from 'react';
import './App.css'
import type { User } from './types/type';

function App() {

  const [loadind, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const query = searchTerm.toLowerCase();
    return fullName.includes(query) || user.email.toLowerCase().includes(query);
  });

  useEffect(() => {
    fetch('https://dummyjson.com/users')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch data');
      return res.json();
    })
    .then((data) => {
      setUsers(data.users);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false)
    })
  })


  return (
    <div className='min-h-screen bg-slate-500'>
      <div className='max-w-4xl mx-auto'>
        <header className=' mb-8 text-center'>
          <h1 className='text-slate-800 text-3xl font-bold mb-3'>Users Directory</h1>
          <input type="text"
            placeholder='Search by name or email...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full max-w-md px-4 py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2
             focus:ring-blue-500 focus:border-blue-500 transition-all text-shadow-slate-700'
          />
        </header>

        {filteredUsers.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-slate-500 text-lg font-medium '>No users found</p>
          </div>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>

          {filteredUsers.map((user) => (
            <div
              className='bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-xl transition-shadow'
              key={user.id}>

              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className='w-14 h-14 rounded-full bg-slate-100 object-cover border border-slate-200'
              />

              <div className='overflow-hidden'>
                <h2 className='font-semibold text-slate-800 truncate'>{user.firstName} {user.lastName}</h2>
                <p className='text-sm text-slate-500 truncate'>{user.email}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default App
