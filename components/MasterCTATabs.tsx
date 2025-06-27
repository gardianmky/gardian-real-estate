'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PRIMARY_TABS = [
    { key: 'buy', label: 'Buying' },
    { key: 'sell', label: 'Selling' },
    { key: 'rent', label: 'Renting' },
    { key: 'commercial', label: 'Commercial' },
    { key: 'property-management', label: 'Property Management' },
];

const SERVICES = [
    {
        key: 'real-estate',
        icon: '🏡',
        label: 'Real Estate',
        title: 'Stress-Free Buying, Selling & Managing',
        subtitle: 'Simplify your property journey in Mackay with expert local support.',
        cta: { text: 'Explore Real Estate', href: '/real-estate' },
    },
    {
        key: 'finance',
        icon: '💰',
        label: 'Finance / Home Loans',
        title: 'Over 30 Lenders. One Application.',
        subtitle: 'Get matched to the right home loan at zero cost.',
        cta: { text: 'Start Your Loan', href: '/finance' },
    },
    {
        key: 'insurance',
        icon: '🛡️',
        label: 'Insurance',
        title: 'Expert Insurance Advice, No Pressure',
        subtitle: 'Free consultations to find the perfect cover for your life or business.',
        cta: { text: 'Get Insured Smartly', href: '/insurance' },
    },
    {
        key: 'commercial',
        icon: '🏢',
        label: 'Commercial',
        title: "Invest in Mackay's Best Commercial Assets",
        subtitle: 'Buy or lease with confidence and build wealth through property.',
        cta: { text: 'Browse Opportunities', href: '/commercial' },
    },
    {
        key: 'financial-planning',
        icon: '📈',
        label: 'Financial Planning',
        title: 'Affordable Advice, Built Around You',
        subtitle: 'Plan smarter with a team that cares about your financial future.',
        cta: { text: 'Book a Consultation', href: '/financial-planning' },
    },
    {
        key: 'property-management',
        icon: '🧰',
        label: 'Property Management',
        title: 'Maximise Returns. Minimise Stress.',
        subtitle: 'Let your investment work harder with expert care.',
        cta: { text: 'Talk to a Manager', href: '/property-management' },
    },
];

export default function MasterCTATabs() {
    const [active, setActive] = useState(0);
    const [primaryTab, setPrimaryTab] = useState('buy');

    return (
        <section
            aria-label="Gardian Service CTAs"
            className="relative z-20 bg-white py-12 px-2 sm:px-0"
        >
            <div className="max-w-5xl mx-auto rounded-3xl shadow-2xl bg-white border border-gray-100 overflow-hidden">
                {/* Top row: Gardian logo left, buttons right */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 pt-6 pb-2">
                    <div className="flex items-center mb-4 md:mb-0">
                        <Image
                            src="/images/gardian-logo.webp"
                            alt="Gardian Logo"
                            width={120}
                            height={40}
                            priority
                        />
                    </div>
                    <div className="flex space-x-2 md:ml-auto">
                        {PRIMARY_TABS.map((tab) => (
                            <button
                                key={tab.key}
                                className={`px-4 py-2 rounded-full text-lg font-semibold transition-all
                  ${primaryTab === tab.key
                                        ? 'bg-[#0a5460] text-white shadow'
                                        : 'bg-white text-[#0a5460] border border-[#0a5460] hover:bg-[#e6f2f3]'
                                    }
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a5460]'
                `}
                                onClick={() => setPrimaryTab(tab.key)}
                                type="button"
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Service Tabs */}
                <div className="flex flex-col md:flex-row">
                    <nav
                        className="flex md:flex-col flex-row md:w-56 bg-[#0a5460] text-white"
                        role="tablist"
                        aria-orientation="horizontal"
                    >
                        {SERVICES.map((tab, idx) => (
                            <button
                                key={tab.key}
                                role="tab"
                                aria-selected={active === idx}
                                aria-controls={`tab-panel-${tab.key}`}
                                tabIndex={active === idx ? 0 : -1}
                                className={`flex-1 md:flex-none flex items-center gap-2 px-4 py-4 md:py-6 text-base font-semibold focus:outline-none transition-all
                  ${active === idx
                                        ? 'bg-white text-[#0a5460] shadow-inner'
                                        : 'hover:bg-[#08424b] hover:text-white text-white/90'
                                    }
                  focus-visible:ring-2 focus-visible:ring-[#0a5460]'
                `}
                                onClick={() => setActive(idx)}
                                onKeyDown={(e) => {
                                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
                                        setActive((idx + 1) % SERVICES.length);
                                    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
                                        setActive((idx - 1 + SERVICES.length) % SERVICES.length);
                                }}
                            >
                                <span className="text-2xl" aria-hidden="true">
                                    {tab.icon}
                                </span>
                                <span className="hidden md:inline">{tab.label}</span>
                                <span className="md:hidden">{tab.label.split(' ')[0]}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Tab Content */}
                    <div className="flex-1 flex items-center justify-center min-h-[260px] px-4 py-8 md:py-0">
                        <div className="w-full flex flex-col items-center text-center px-2">
                            <span className="text-4xl mb-2">{SERVICES[active].icon}</span>
                            <h3 className="text-2xl md:text-3xl font-bold text-[#0a5460] mb-2">
                                {SERVICES[active].title}
                            </h3>
                            <p className="text-lg text-gray-600 mb-6">
                                {SERVICES[active].subtitle}
                            </p>
                            <Link
                                href={SERVICES[active].cta.href}
                                className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-[#0a5460] text-white font-semibold shadow-lg transition-all duration-200 hover:bg-[#08424b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a5460]"
                            >
                                {SERVICES[active].cta.text}
                                <svg
                                    className="w-5 h-5 text-white ml-2 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}