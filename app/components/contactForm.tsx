'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('Message sent!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus(`Error: ${data.error || 'Something went wrong'}`);
      }
    } catch (err) {
      setStatus('Error sending message');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-indigo-100"
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-2 text-center">
          Contact Us
        </h2>
        <p className="text-gray-500 text-center mb-6">
          We'd love to hear from you!
        </p>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full px-4 py-2 rounded-lg border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full px-4 py-2 rounded-lg border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Your message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="textarea textarea-bordered w-full px-4 py-2 rounded-lg border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg shadow transition"
        >
          Send
        </button>
        {status && (
          <p
            className={`text-center mt-2 font-medium transition ${
              status === 'Message sent!'
                ? 'text-green-600'
                : status === 'Sending...'
                ? 'text-indigo-500'
                : 'text-red-600'
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}

