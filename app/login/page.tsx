// "use client";
// import { useRouter } from 'next/navigation'
// import { FormEvent } from 'react'


// export default function LoginPage() {
//     const router = useRouter()

//     async function handleSubmit(event: FormEvent<HTMLFormElement>) {
//         event.preventDefault()

//         const formData = new FormData(event.currentTarget)
//         const email = formData.get('email')
//         const password = formData.get('password')

//         const response = await fetch('/api/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password }),
//         })

//         if (response.ok) {
//             router.push('/profile')
//         } else {
//             // Handle errors
//         }
//     }

//     return (
//         <div className='flex justify-center mb-10'>
//             <form className='py-20' onSubmit={handleSubmit}>
//                 <input type="email" name="email" placeholder="Email" required />
//                 <input type="password" name="password" placeholder="Password" required />
//                 <button type="submit">Login</button>
//             </form>
//         </div>

//     )
// }


import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}