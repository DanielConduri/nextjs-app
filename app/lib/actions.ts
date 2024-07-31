'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
 
//Convert data type 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

//The amount field is specifically set to coerce (change) from a string to a number while also validating its type.
const CreateInvoice = FormSchema.omit({ id: true, date: true });
 
export async function createInvoice(formData: FormData) {
    // const rawFormData = {
    //     customerId: formData.get('customerId'),
    //     amount: formData.get('amount'),
    //     status: formData.get('status'),
    // };


    //You can then pass your rawFormData to CreateInvoice to validate the types:
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
        
      });

      

    /*It's usually good practice to store monetary values in cents in your database 
    to eliminate JavaScript floating-point errors and ensure greater accuracy.*/
    //Let's convert the amount into cents:
    const amountInCents = amount * 100;

    //let's create a new date with the format "YYYY-MM-DD" for the invoice's creation date:
    const date = new Date().toISOString().split('T')[0];
    // Test it out:
  //console.log(rawFormData);
  //console.log(typeof rawFormData.amount);

  await sql `
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`
  ;

  /*Since you're updating the data displayed in the invoices route, you want to clear this cache
   and trigger a new request to the server. You can do this with the revalidatePath function from Next.js:*/
  revalidatePath('/dashboard/invoices');

  redirect('/dashboard/invoices');
}


// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
// ...
 
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  //revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}