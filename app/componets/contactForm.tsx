// 'use client';

// import { useState } from 'react';

// export default function ContactForm() {
//   const [form, setForm] = useState({ name: '', email: '', message: '' });
//   const [status, setStatus] = useState('');

//   // ✅ Handles input changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ✅ Handles form submission
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // 🔒 Prevents default GET request

//     setStatus('Sending...');

//     try {
//       const res = await fetch('/api/send', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setStatus('Message sent!');
//         setForm({ name: '', email: '', message: '' });
//       } else {
//         setStatus(`Error: ${data.error || 'Something went wrong'}`);
//       }
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (err) {
//       setStatus('Error sending message');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         type="text"
//         name="name"
//         placeholder="Your name"
//         value={form.name}
//         onChange={handleChange}
//         required
//         className="border p-2 w-full"
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Your email"
//         value={form.email}
//         onChange={handleChange}
//         required
//         className="border p-2 w-full"
//       />
//       <textarea
//         name="message"
//         placeholder="Your message"
//         value={form.message}
//         onChange={handleChange}
//         required
//         className="border p-2 w-full"
//       />
//       <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//         Send
//       </button>
//       <p>{status}</p>
//     </form>
//   );
// }

export default function UnderConstruction() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">This Page is Not Working</h1>
      <p className="text-lg text-gray-700">We’re still building it. Please check back soon!</p>
    </div>
  );
}
