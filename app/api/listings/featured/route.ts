import { NextResponse } from 'next/server'

export async function GET() {
  // Test commercial properties data
  const testData = [
    {
      id: 1,
      title: "Downtown Office Space",
      address: "123 Business Ave, Mackay",
      price: "$1,200,000",
      type: "Commercial",
      size: "2,500 sqft",
      image: "/placeholder.jpg"
    },
    {
      id: 2,
      title: "Retail Plaza",
      address: "456 Commerce St, Mackay", 
      price: "$2,500,000",
      type: "Commercial",
      size: "5,000 sqft",
      image: "/placeholder.jpg"
    }
  ]

  // Simulate network delay for testing
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return NextResponse.json(testData)
}