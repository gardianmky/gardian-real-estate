'use client';

import React from 'react';
import { useFormSubmission, FormField } from '@/hooks/use-form-submission';
import { FormInput, FormMessage } from '@/components/ui/form-components';

const landlordFormFields: FormField[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your first name'
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your last name'
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    placeholder: 'Enter your email address'
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    required: true,
    placeholder: 'Enter your phone number'
  },
  {
    name: 'propertyAddress',
    label: 'Property Address',
    type: 'text',
    required: true,
    placeholder: 'Enter the full property address'
  },
  {
    name: 'propertyType',
    label: 'Property Type',
    type: 'select',
    options: [
      { value: 'house', label: 'House' },
      { value: 'unit', label: 'Unit/Apartment' },
      { value: 'townhouse', label: 'Townhouse' },
      { value: 'villa', label: 'Villa' },
      { value: 'duplex', label: 'Duplex' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    name: 'bedrooms',
    label: 'Number of Bedrooms',
    type: 'select',
    options: [
      { value: '1', label: '1 Bedroom' },
      { value: '2', label: '2 Bedrooms' },
      { value: '3', label: '3 Bedrooms' },
      { value: '4', label: '4 Bedrooms' },
      { value: '5', label: '5+ Bedrooms' }
    ]
  },
  {
    name: 'bathrooms',
    label: 'Number of Bathrooms',
    type: 'select',
    options: [
      { value: '1', label: '1 Bathroom' },
      { value: '2', label: '2 Bathrooms' },
      { value: '3', label: '3 Bathrooms' },
      { value: '4', label: '4+ Bathrooms' }
    ]
  },
  {
    name: 'expectedRent',
    label: 'Expected Weekly Rent',
    type: 'text',
    placeholder: 'e.g. 450 (enter amount without $ sign)'
  },
  {
    name: 'managementType',
    label: 'Management Type',
    type: 'select',
    options: [
      { value: 'full', label: 'Full Management' },
      { value: 'tenant-find', label: 'Tenant Finding Only' },
      { value: 'undecided', label: 'I\'m not sure yet' }
    ]
  },
  {
    name: 'availabilityDate',
    label: 'Available From',
    type: 'text',
    placeholder: 'e.g. Immediately, or specific date'
  },
  {
    name: 'additionalInfo',
    label: 'Additional Information',
    type: 'textarea',
    placeholder: 'Tell us about any special features, recent renovations, or specific requirements...'
  },
  {
    name: 'consent',
    label: 'I agree to receive communications from Gardian Real Estate and understand that I can unsubscribe at any time.',
    type: 'checkbox',
    required: true
  }
];

export function LandlordForm() {
  const { state, formData, updateField, submitForm, clearMessages } = useFormSubmission({
    endpoint: '/api/contact/landlord',
    onSuccess: () => {
      // Scroll to success message
      setTimeout(() => {
        document.getElementById('form-messages')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(landlordFormFields);
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get Your Free Property Appraisal
            </h2>
            <p className="text-xl text-gray-600">
              Complete the form below and we'll arrange a complimentary rental appraisal for your property
            </p>
          </div>

          <div id="form-messages" className="mb-8">
            {state.isSuccess && state.message && (
              <FormMessage 
                type="success" 
                message={state.message}
                onDismiss={clearMessages}
              />
            )}
            {state.error && (
              <FormMessage 
                type="error" 
                message={state.error}
                onDismiss={clearMessages}
              />
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {landlordFormFields.map((field) => (
                <div 
                  key={field.name} 
                  className={
                    ['propertyAddress', 'additionalInfo', 'consent'].includes(field.name)
                      ? 'md:col-span-2' 
                      : ''
                  }
                >
                  <FormInput
                    field={field}
                    value={formData[field.name]}
                    onChange={(value) => updateField(field.name, value)}
                  />
                </div>
              ))}

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={state.isSubmitting}
                  className="w-full bg-teal-600 text-white py-4 px-8 rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold text-lg flex items-center justify-center"
                >
                  {state.isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Get Free Property Appraisal'
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="text-center mt-8 text-sm text-gray-600">
            <p>
              By submitting this form, you acknowledge that the information you provide will be used 
              to contact you about property management services. Your privacy is important to us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
