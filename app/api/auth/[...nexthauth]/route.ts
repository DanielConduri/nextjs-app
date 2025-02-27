import { NextRequest, NextResponse } from "next/server"
export async function GET( request: NextRequest) {
  // lógica para manejar GET
  return NextResponse.json({ message: 'Hello, Next.js!' });
}

export async function POST(request: Request) {
  // lógica para manejar POST
  return NextResponse.json({ message: 'POST request received!' });
}

// export const NexthAuth= () => {
  
// }
