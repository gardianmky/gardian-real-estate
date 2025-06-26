import { Agent } from "types/index";
import Image from "next/image";

interface AgentsSectionProps {
  agents: Agent[];
}

export default function AgentsSection({ agents }: AgentsSectionProps) {
  // Select 5 random agents
  const featuredAgents = agents.sort(() => 0.5 - Math.random()).slice(0, 5);

  return (
    <div className="flex flex-col items-center space-y-6">
      {featuredAgents.map((agent, index) => (
        <div
          key={agent.agentID}
          className={`bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg ${
            index % 2 === 0 ? "translate-x-2" : "-translate-x-2"
          }`}
        >
          <div className="relative h-40 w-40 mx-auto rounded-full overflow-hidden mb-4">
            <Image
              src={agent.imageURL || "/placeholder-user.jpg"}
              alt={agent.name}
              fill
              className="object-cover"
              sizes="160px"
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-user.jpg";
              }}
            />
          </div>
          <h3 className="text-xl font-bold text-center text-gray-800">
            {agent.name}
          </h3>
          <p className="text-gray-600 text-center">{agent.title}</p>
        </div>
      ))}
    </div>
  );
}
