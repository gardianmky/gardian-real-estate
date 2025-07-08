import { redirect } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>;
}

// Redirect from legacy /agent/[id] route to new /agents/[id] route
export default async function AgentRedirectPage({ params }: Props) {
  const { id } = await params;
  redirect(`/agents/${id}`);
}