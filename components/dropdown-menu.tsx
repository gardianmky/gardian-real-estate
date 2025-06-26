"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

type DropdownMenuProps = {
  title: string
  children: React.ReactNode
  className?: string
}

export default function DropdownMenu({ title, children, className = "" }: DropdownMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex flex-row items-center justify-between gap-2 py-2 px-3 text-left font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 ${className}`}
      >
        <span>{title}</span>
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {isExpanded && <div className="grid grid-cols-1 gap-1 px-3 pb-3 text-xs">{children}</div>}
    </div>
  )
}
