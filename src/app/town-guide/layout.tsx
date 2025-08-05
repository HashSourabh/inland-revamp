import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Town Guide - Inland Andalucia',
  description: 'Explore the beautiful towns and cities of Andalucia, Spain. Find detailed information about Cordoba, Granada, Jaen, Malaga, and Sevilla.',
}

export default function TownGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="pb-10">
      {children}
    </div>
  )
} 