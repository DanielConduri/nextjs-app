// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// Esta sería la función de autenticación que ahora debe ser llamada en este archivo.
import { authenticate } from '@/app/lib/actions';
import { NextResponse } from 'next/server';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;

//     try {
//       // Realiza la autenticación con la función que tenías en `lib`
//       const user = await authenticate(email, password);
      
//       if (user) {
//         res.status(200).json({ success: true, user });
//       } else {
//         res.status(401).json({ success: false, error: 'Invalid credentials' });
//       }
//     } catch (error) {
//       res.status(500).json({ success: false, error: 'Something went wrong' });
//     }
//   } else {
//     res.status(405).json({ success: false, error: 'Method not allowed' });
//   }

//   if (req.method === 'GET'){
//     res.status(200).json({ success: true});
//   }

  
// }


export async function POST() {
  return NextResponse.json({
      hello: 'world'
  })
}