import React, { useState } from 'react';

// 1. العقد الأساسي للبيانات (نفس حقول DummyJSON بالضبط)
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

// 2. بيانات وهمية مطابقة للـ Interface لتجربة الواجهة فوراً
const MOCK_USERS: User[] = [
  {
    id: 1,
    firstName: "إبراهيم",
    lastName: "سعيد",
    email: "ibrahim@example.com",
    image: "https://dummyjson.com/icon/emilys/128",
  },
  {
    id: 2,
    firstName: "Michael",
    lastName: "Williams",
    email: "michael.w@example.com",
    image: "https://dummyjson.com/icon/michaelw/128",
  },
  {
    id: 3,
    firstName: "Sophia",
    lastName: "Brown",
    email: "sophia.b@example.com",
    image: "https://dummyjson.com/icon/sophiab/128",
  },
];

export default function UsersPage() {
  // الـ State تبدأ بالبيانات الوهمية لتجربة الشكل
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // منطق التصفية (البحث بالاسم أو البريد)
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const query = searchTerm.toLowerCase();
    return fullName.includes(query) || user.email.toLowerCase().includes(query);
  });

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* العنوان وشريط البحث */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Users Directory</h1>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-700"
          />
        </header>

        {/* الحالة الفارغة (Empty State) إذا لم يتطابق البحث */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg font-medium">No users found</p>
          </div>
        )}

        {/* شبكة عرض كروت المستخدمين */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-14 h-14 rounded-full bg-slate-100 object-cover border border-slate-200"
              />
              <div className="overflow-hidden">
                <h2 className="font-semibold text-slate-800 truncate">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}