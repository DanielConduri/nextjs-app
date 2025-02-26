'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
// import { useActionState } from 'react';
import { useFormState } from 'react-dom';

import { authenticate } from '@/app/lib/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import axios from 'axios';
import React from 'react';
import Form from './invoices/create-form';


// export default function LoginForm() {
//   const router = useRouter();
//   const [user, setUser] = React.useState({
//     email: "",
//     password: ""
//   })

//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

//   const [isPending, setIsPending] = useState(false);

//   const handleFormSubmit = async (formData: FormData) => {
//     setIsPending(true);
//     formAction(formData);
//     setIsPending(false);
//   };

//   const [errorMessage, formAction] = useFormState(
//     authenticate,
//     undefined,
//   );

//   //const checkButton = async () => {
//   const onLogin = async () => {
//     try {
//       const res = await axios.post('/api/login', user)
//       console.log("Login Successful", res.data)
//       router.push('/dashboard')
//     } catch (error: any) {
//       console.log(error.message);
//     }
//   }
//   //}

//   return (
//     <form action={handleFormSubmit} className="space-y-3">
//       <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
//         <h1 className={`${lusitana.className} mb-3 text-2xl`}>
//           Please log in to continue.
//         </h1>
//         <div className="w-full">
//           <div>
//             <label
//               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <div className="relative">
//               <input
//                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 id="email"
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email address"
//                 required
//               />
//               <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <label
//               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 id="password"
//                 type="password"
//                 name="password"
//                 placeholder="Enter password"
//                 required
//                 minLength={6}
//               />
//               <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//         </div>
//         <input type="hidden" name="redirectTo" value={callbackUrl} />
//         <Button className="mt-4 w-full" aria-disabled={isPending}>
//           Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
//         </Button>
//         <div
//           className="flex h-8 items-end space-x-1"
//           aria-live="polite"
//           aria-atomic="true"
//         >
//           {errorMessage && (
//             <>
//               <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
//               <p className="text-sm text-red-500">{errorMessage}</p>
//             </>
//           )}
//         </div>
//       </div>
//     </form>
//   );
// }

//---------------------------------------------------------
export default function LoginForm() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: ""
  })

  const [buttondisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false);
  const [emptyField, setEmptyField] = React.useState(false)

  const checkButtonState = async () => {
    if (!buttondisabled) {
      const onLogin = async () => {
        try {
          //   setLoading(true);
          //   const res = await fetch("/api/login", {
          //     method: "POST",
          //     headers: { "Content-Type": "application/json" },
          //     body: JSON.stringify({ user }),
          //     credentials: "include", // 🔥 IMPORTANTE para que la cookie se guarde
          // });
          // console.log("Login Successful", res)
          const res = await axios.post('/api/login', user)
          console.log("Login Successful", res.data)
          router.push('/dashboard')
        } catch (error: any) {
          setError(true)
          console.log(error.message);
        } finally {
          setLoading(false)
        }
      }
      onLogin()
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
      setEmptyField(false)
    }
  }, [user])

  return (

    /*<form> tag, the submit button inside it automatically triggers the form submission and reloads the page, 
    which may interfere with cookie storage or authentication handling.
    Solutions
    event.preventDefault() //Prevents the default behavior of an event from ocurring
    1. <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); checkButtonState();}} >  //Prevent the form from reloading the page
    2. <Button type='button'> 
    3. onClick={(event) => { event.preventDefault(); checkButtonState() }}

    */
    <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); checkButtonState();}} >
      
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}

                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* <input type="hidden" name="redirectTo" value={callbackUrl} /> */}
        <Button className="mt-4 w-full" //aria-disabled={isPending}
        >
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-red-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )} */}
        </div>
      </div>
    </form>
  );
}