'use client';

import { useState, useActionState } from 'react';
import Hari1 from '@/app/ui/hari1';
import Hari2 from '@/app/ui/hari2';
import { StateUser } from '@/app/lib/definitions';
import { createUserReg } from '@/app/lib/actions';

export default function Home() {
  const initialState: StateUser = { message: null, errors: {} };
  const [state, formAction] = useActionState(createUserReg, initialState);
  const [hari, setHari] = useState('0');

  return (
    <div className="flex flex-col items-center h-screen bg-gray-200 justify-center">
      <div className="font-bold text-xl">Registrasi SAC 2025</div>
      <div className="">
        <form className="flex flex-col gap-2" action={formAction}>
          <div className="">
            <input 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
            />
          </div>
          <div className="">
            <input 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text" 
              name="text" 
              placeholder="Nama" 
              required 
            />
          </div>
          <select
            id="hari"
            name="hari"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={hari}
            onChange={(e) => setHari(e.target.value)}
            required
          >
            <option value="">-- Pilih Hari --</option>
            <option value="1">Hari 1</option>
            <option value="2">Hari 2</option>
          </select>
          {hari === '1' && <Hari1 />}
          {hari === '2' && <Hari2 />}

          <button className="bg-blue-500 text-white rounded mt-4 py-2 cursor-pointer hover:bg-white hover:text-blue-500 hover:border-blue-500 border">Submit</button>
        </form>
      </div>

      <div className="flex justify-center">
        {state?.errors?.email && (
          <p className="mt-4 text-red-600">{state.errors.email}</p>
        )}
        {state?.errors?.general && (
          <p className="mt-4 text-red-600">{state.errors.general}</p>
        )}
      </div>
    </div>
  );
}
