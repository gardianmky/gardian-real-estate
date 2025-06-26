'use client';

import { useState } from 'react';

export interface FormSubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  message: string | null;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'file';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  validation?: (value: any) => string | null;
}

export interface UseFormSubmissionProps {
  endpoint: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  resetOnSuccess?: boolean;
}

export function useFormSubmission({
  endpoint,
  onSuccess,
  onError,
  resetOnSuccess = true
}: UseFormSubmissionProps) {
  const [state, setState] = useState<FormSubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
    message: null
  });

  const [formData, setFormData] = useState<Record<string, any>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateForm = (fields: FormField[], data: Record<string, any>): string[] => {
    const errors: string[] = [];

    fields.forEach(field => {
      const value = data[field.name];

      // Required field validation
      if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        errors.push(`${field.label} is required`);
        return;
      }

      // Type-specific validation
      if (value && typeof value === 'string' && value.trim() !== '') {
        switch (field.type) {
          case 'email':
            if (!validateEmail(value)) {
              errors.push(`${field.label} must be a valid email address`);
            }
            break;
          case 'tel':
            if (!validatePhone(value)) {
              errors.push(`${field.label} must be a valid phone number`);
            }
            break;
        }
      }

      // Custom validation
      if (field.validation && value) {
        const validationError = field.validation(value);
        if (validationError) {
          errors.push(validationError);
        }
      }
    });

    return errors;
  };

  const updateField = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearMessages = () => {
    setState(prev => ({
      ...prev,
      error: null,
      message: null,
      isSuccess: false
    }));
  };

  const submitForm = async (fields: FormField[], customData?: Record<string, any>) => {
    clearMessages();
    
    const dataToSubmit = { ...formData, ...customData };
    const validationErrors = validateForm(fields, dataToSubmit);

    if (validationErrors.length > 0) {
      setState(prev => ({
        ...prev,
        error: validationErrors.join(', ')
      }));
      return;
    }

    setState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...dataToSubmit,
          timestamp: new Date().toISOString(),
          source: 'Gardian Real Estate Website'
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Server error: ${response.status}`);
      }

      setState(prev => ({
        ...prev,
        isSubmitting: false,
        isSuccess: true,
        message: result.message || 'Form submitted successfully! We\'ll be in touch soon.'
      }));

      if (resetOnSuccess) {
        setFormData({});
      }

      onSuccess?.(result);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
      
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        error: errorMessage
      }));

      onError?.(errorMessage);
    }
  };

  const reset = () => {
    setState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
      message: null
    });
    setFormData({});
  };

  return {
    state,
    formData,
    updateField,
    submitForm,
    clearMessages,
    reset
  };
}
