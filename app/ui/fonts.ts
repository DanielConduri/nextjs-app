import { Montserrat, Inter, Lusitana } from 'next/font/google'

export const montserrat = Montserrat({ subsets: ['latin'], weight: '700'})

export const inter = Inter({subsets: ['latin'], weight: '500'})

export const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin']
})