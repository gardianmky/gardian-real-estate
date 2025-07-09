"use client";

import { Agent } from "@/types";
import Link from "next/link";
import { Phone } from "lucide-react";

interface AgentShowcaseProps {
  agents: Agent[];
}

export default function AgentShowcase({ agents }: AgentShowcaseProps) {
  return (
    <section className="bg-teal-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Meet Our Agents</h2>
        <div className="relative overflow-x-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide">
            {agents.map((agent) => (
              <Link key={agent.agentID} href={`/agents/${agent.agentID}`} className="text-center group">
                <img
                  src={agent.imageURL || '/placeholder-user.jpg'}
                  alt={agent.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-white shadow hover:scale-105 transition-transform duration-300"
                />
                <h3 className="mt-2 font-semibold">{agent.name}</h3>
                <p className="text-gray-500 text-sm mb-1">{agent.title}</p>
                {(agent.mobile || agent.phone) && (
                  <div className="flex items-center justify-center text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Phone className="h-3 w-3 mr-1" />
                    <span className="text-xs">{agent.mobile || agent.phone}</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
