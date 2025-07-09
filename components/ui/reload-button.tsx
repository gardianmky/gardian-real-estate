'use client';

interface ReloadButtonProps {
  className?: string;
  children: React.ReactNode;
}

export function ReloadButton({ className, children }: ReloadButtonProps) {
  return (
    <button
      onClick={() => window.location.reload()}
      className={className}
    >
      {children}
    </button>
  );
}