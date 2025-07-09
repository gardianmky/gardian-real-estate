'use client';

import React from 'react';

interface TealGradientSectionProps {
  children: React.ReactNode;
  variant?: 'section' | 'hero' | 'card' | 'navbar' | 'accent';
  className?: string;
  onClick?: () => void;
}

export const TealGradientSection: React.FC<TealGradientSectionProps> = ({
  children,
  variant = 'section',
  className = '',
  onClick
}) => {
  const baseClass = `teal-gradient-${variant}`;
  const combinedClass = `${baseClass} ${className}`.trim();

  return (
    <div className={combinedClass} onClick={onClick}>
      {children}
    </div>
  );
};

interface TealGradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const TealGradientButton: React.FC<TealGradientButtonProps> = ({
  children,
  onClick,
  href,
  className = '',
  type = 'button',
  disabled = false
}) => {
  const baseClass = 'teal-gradient-button';
  const combinedClass = `${baseClass} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={combinedClass}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClass}
    >
      {children}
    </button>
  );
};

interface TealGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export const TealGradientText: React.FC<TealGradientTextProps> = ({
  children,
  className = ''
}) => {
  const baseClass = 'teal-gradient-text';
  const combinedClass = `${baseClass} ${className}`.trim();

  return (
    <span className={combinedClass}>
      {children}
    </span>
  );
};

// Example usage component
export const TealGradientExample: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Hero Section */}
      <TealGradientSection variant="hero" className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Gardian Real Estate
        </h1>
        <p className="text-xl mb-6 opacity-90">
          Your trusted partner in finding the perfect property
        </p>
        <TealGradientButton>
          Get Started
        </TealGradientButton>
      </TealGradientSection>

      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TealGradientSection variant="card" className="text-center">
          <h3 className="text-xl font-semibold mb-2">Buy Properties</h3>
          <p className="opacity-90">Find your dream home with our expert guidance</p>
        </TealGradientSection>

        <TealGradientSection variant="card" className="text-center">
          <h3 className="text-xl font-semibold mb-2">Sell Properties</h3>
          <p className="opacity-90">Get the best value for your property</p>
        </TealGradientSection>

        <TealGradientSection variant="card" className="text-center">
          <h3 className="text-xl font-semibold mb-2">Property Management</h3>
          <p className="opacity-90">Professional management services</p>
        </TealGradientSection>
      </div>

      {/* Regular Section */}
      <TealGradientSection className="text-white">
        <h2 className="text-2xl font-bold mb-4">Why Choose Gardian Real Estate?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Expert Knowledge</h3>
            <p className="opacity-90">Our team has deep local market expertise</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Personalized Service</h3>
            <p className="opacity-90">Tailored solutions for your unique needs</p>
          </div>
        </div>
      </TealGradientSection>

      {/* Accent Elements */}
      <div className="flex flex-wrap gap-3">
        <TealGradientSection variant="accent">Featured Property</TealGradientSection>
        <TealGradientSection variant="accent">New Listing</TealGradientSection>
        <TealGradientSection variant="accent">Price Reduced</TealGradientSection>
      </div>

      {/* Gradient Text */}
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          <TealGradientText>Premium Real Estate Services</TealGradientText>
        </h2>
        <p className="mt-2 text-gray-600">
          Experience the difference with our professional approach
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <TealGradientButton>Contact Us</TealGradientButton>
        <TealGradientButton href="/properties">View Properties</TealGradientButton>
        <TealGradientButton>Schedule Consultation</TealGradientButton>
      </div>
    </div>
  );
};