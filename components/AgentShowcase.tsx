"use client";

import { Agent } from "@/types";
import Link from "next/link";

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
              <Link key={agent.agentID} href={`/agents/${agent.agentID}`} className="text-center">
                <img
                  src={agent.imageURL || '/placeholder-user.jpg'}
                  alt={agent.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-white shadow hover:scale-105 transition-transform duration-300"
                />
                <h3 className="mt-2 font-semibold">{agent.name}</h3>
                <p className="text-gray-500 text-sm">{agent.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// If you are not using animateSlide elsewhere, you can remove this block entirely.
// If you want to define a keyframes animation, use a CSS file or a CSS-in-JS solution.
// For now, remove this code to resolve the error.
