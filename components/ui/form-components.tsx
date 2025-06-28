'use client';

import React from 'react';
import { FormField } from '@/hooks/use-form-submission';

interface FormInputProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

export function FormInput({ field, value, onChange, error }: FormInputProps) {
  const baseClassName = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
    error 
      ? 'border-red-300 bg-red-50' 
      : 'border-gray-300 focus:bg-white'
  }`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = field.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    onChange(newValue);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onChange(files[0]);
    }
  };

  return (
    <div className={field.type === 'checkbox' ? 'flex items-start' : ''}>
      <label className={`block text-sm font-medium text-gray-700 mb-2 ${
        field.type === 'checkbox' ? 'ml-2 order-2' : ''
      }`}>
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>
      
      {field.type === 'textarea' && (
        <textarea
          name={field.name}
          value={value || ''}
          onChange={handleChange}
          placeholder={field.placeholder}
          required={field.required}
          rows={4}
          className={baseClassName}
        />
      )}
      
      {field.type === 'select' && (
        <select
          name={field.name}
          value={value || ''}
          onChange={handleChange}
          required={field.required}
          className={baseClassName}
        >
          <option value="">Select {field.label.toLowerCase()}</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      
      {field.type === 'checkbox' && (
        <input
          type="checkbox"
          name={field.name}
          checked={value || false}
          onChange={handleChange}
          required={field.required}
          className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded order-1"
        />
      )}
      
      {field.type === 'file' && (
        <input
          type="file"
          name={field.name}
          onChange={handleFileChange}
          required={field.required}
          className={baseClassName}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
      )}
      
      {!['textarea', 'select', 'checkbox', 'file'].includes(field.type) && (
        <input
          type={field.type}
          name={field.name}
          value={value || ''}
          onChange={handleChange}
          placeholder={field.placeholder}
          required={field.required}
          className={baseClassName}
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

interface FormMessageProps {
  type: 'success' | 'error';
  message: string;
  onDismiss?: () => void;
}

export function FormMessage({ type, message, onDismiss }: FormMessageProps) {
  const bgColor = type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const iconColor = type === 'success' ? 'text-green-400' : 'text-red-400';

  return (
    <div className={`border rounded-lg p-4 ${bgColor}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {type === 'success' ? (
            <svg className={`h-5 w-5 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className={`h-5 w-5 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${textColor}`}>
            {message}
          </p>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  type === 'success' 
                    ? 'text-green-500 hover:bg-green-100 focus:ring-green-600' 
                    : 'text-red-500 hover:bg-red-100 focus:ring-red-600'
                }`}
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
