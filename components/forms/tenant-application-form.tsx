'use client';

import React from 'react';
import { useFormSubmission, FormField } from '@/hooks/use-form-submission';
import { FormInput, FormMessage } from '@/components/ui/form-components';

const tenantFormFields: FormField[] = [
  // Personal Information
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
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'text',
    placeholder: 'DD/MM/YYYY'
  },
  
  // Current Living Situation
  {
    name: 'currentAddress',
    label: 'Current Address',
    type: 'text',
    placeholder: 'Enter your current full address'
  },
  {
    name: 'currentRent',
    label: 'Current Weekly Rent',
    type: 'text',
    placeholder: 'Enter amount without $ sign'
  },
  {
    name: 'moveOutDate',
    label: 'Available Move Out Date',
    type: 'text',
    placeholder: 'DD/MM/YYYY or "Immediately"'
  },
  {
    name: 'reasonForMoving',
    label: 'Reason for Moving',
    type: 'text',
    placeholder: 'e.g. Job relocation, family growth, etc.'
  },
  
  // Employment Information
  {
    name: 'employer',
    label: 'Current Employer',
    type: 'text',
    placeholder: 'Company/Organization name'
  },
  {
    name: 'position',
    label: 'Position/Job Title',
    type: 'text',
    placeholder: 'Your current position'
  },
  {
    name: 'annualIncome',
    label: 'Annual Income',
    type: 'text',
    placeholder: 'Enter amount without $ sign'
  },
  {
    name: 'employmentType',
    label: 'Employment Type',
    type: 'select',
    options: [
      { value: 'full-time', label: 'Full-time' },
      { value: 'part-time', label: 'Part-time' },
      { value: 'casual', label: 'Casual' },
      { value: 'contract', label: 'Contract' },
      { value: 'self-employed', label: 'Self-employed' },
      { value: 'student', label: 'Student' },
      { value: 'pensioner', label: 'Pensioner' },
      { value: 'other', label: 'Other' }
    ]
  },
  
  // Rental Preferences
  {
    name: 'preferredArea',
    label: 'Preferred Area/Suburbs',
    type: 'text',
    placeholder: 'e.g. Mackay, North Mackay, Eimeo'
  },
  {
    name: 'maxWeeklyRent',
    label: 'Maximum Weekly Rent',
    type: 'text',
    placeholder: 'Enter your maximum budget'
  },
  {
    name: 'moveInDate',
    label: 'Preferred Move-in Date',
    type: 'text',
    placeholder: 'DD/MM/YYYY or "ASAP"'
  },
  {
    name: 'householdSize',
    label: 'Total Household Size',
    type: 'select',
    options: [
      { value: '1', label: '1 person' },
      { value: '2', label: '2 people' },
      { value: '3', label: '3 people' },
      { value: '4', label: '4 people' },
      { value: '5', label: '5 people' },
      { value: '6+', label: '6+ people' }
    ]
  },
  {
    name: 'pets',
    label: 'Do you have pets?',
    type: 'checkbox'
  },
  {
    name: 'petsDetails',
    label: 'Pet Details',
    type: 'text',
    placeholder: 'If yes, please describe your pets (type, breed, size, etc.)'
  },
  
  // References
  {
    name: 'previousLandlord',
    label: 'Previous Landlord/Agent Name',
    type: 'text',
    placeholder: 'Name of previous landlord or agent'
  },
  {
    name: 'previousLandlordPhone',
    label: 'Previous Landlord/Agent Phone',
    type: 'tel',
    placeholder: 'Phone number'
  },
  {
    name: 'employerReference',
    label: 'Employer Reference Contact',
    type: 'text',
    placeholder: 'Supervisor name and phone number'
  },
  {
    name: 'personalReference',
    label: 'Personal Reference',
    type: 'text',
    placeholder: 'Name and phone number of personal reference'
  },
  
  // Additional Information
  {
    name: 'additionalInfo',
    label: 'Additional Information',
    type: 'textarea',
    placeholder: 'Any additional information you\'d like us to know about your application...'
  },
  {
    name: 'consent',
    label: 'I agree to receive communications from Gardian Real Estate regarding my rental application and understand that I can unsubscribe at any time.',
    type: 'checkbox',
    required: true
  }
];

export function TenantApplicationForm() {
  const { state, formData, updateField, submitForm, clearMessages } = useFormSubmission({
    endpoint: '/api/contact/tenant',
    onSuccess: () => {
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
    await submitForm(tenantFormFields);
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Rental Application Form
            </h2>
            <p className="text-xl text-gray-600">
              Complete your rental application online - it's fast, secure, and helps us process your application quickly
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
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Information Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tenantFormFields.slice(0, 5).map((field) => (
                    <FormInput
                      key={field.name}
                      field={field}
                      value={formData[field.name]}
                      onChange={(value) => updateField(field.name, value)}
                    />
                  ))}
                </div>
              </div>

              {/* Current Living Situation */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  Current Living Situation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tenantFormFields.slice(5, 9).map((field) => (
                    <FormInput
                      key={field.name}
                      field={field}
                      value={formData[field.name]}
                      onChange={(value) => updateField(field.name, value)}
                    />
                  ))}
                </div>
              </div>

              {/* Employment Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  Employment Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tenantFormFields.slice(9, 13).map((field) => (
                    <FormInput
                      key={field.name}
                      field={field}
                      value={formData[field.name]}
                      onChange={(value) => updateField(field.name, value)}
                    />
                  ))}
                </div>
              </div>

              {/* Rental Preferences */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  Rental Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tenantFormFields.slice(13, 19).map((field) => (
                    <div key={field.name} className={field.name === 'petsDetails' ? 'md:col-span-2 lg:col-span-3' : ''}>
                      <FormInput
                        field={field}
                        value={formData[field.name]}
                        onChange={(value) => updateField(field.name, value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* References */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  References
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tenantFormFields.slice(19, 23).map((field) => (
                    <FormInput
                      key={field.name}
                      field={field}
                      value={formData[field.name]}
                      onChange={(value) => updateField(field.name, value)}
                    />
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  Additional Information
                </h3>
                <div className="space-y-6">
                  {tenantFormFields.slice(23).map((field) => (
                    <FormInput
                      key={field.name}
                      field={field}
                      value={formData[field.name]}
                      onChange={(value) => updateField(field.name, value)}
                    />
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
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
                      Submitting Application...
                    </>
                  ) : (
                    'Submit Rental Application'
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="text-center mt-8 text-sm text-gray-600">
            <p className="mb-2">
              <strong>Required Documents:</strong> Photo ID, payslips (last 4 weeks), 
              bank statements (last 3 months), rental references
            </p>
            <p>
              All information provided will be kept confidential and used solely for 
              the purpose of processing your rental application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
