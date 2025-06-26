"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FeaturedAgent {
  id: number
  name: string
  title: string
  image: string
  properties: number
}

interface FeaturedAgentsProps {
  className?: string
}

const agents: FeaturedAgent[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Agent",
    image: "/agents/sarah.jpg",
    properties: 42
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Luxury Specialist", 
    image: "/agents/michael.jpg",
    properties: 28
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    title: "First-Time Buyer Expert",
    image: "/agents/emma.jpg",
    properties: 35
  }
]

export default function FeaturedAgents({ className }: FeaturedAgentsProps) {
  return (
    <section className={className ? cn("py-12", className) : "py-12"}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Our Featured Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Card key={agent.id}>
              <CardHeader>
                <div className="relative h-48 w-full">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    className="rounded-t-lg object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle>{agent.name}</CardTitle>
                <p className="text-gray-600 mb-2">{agent.title}</p>
                <p className="text-sm mb-4">{agent.properties} properties listed</p>
                <Button variant="outline">View Profile</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}