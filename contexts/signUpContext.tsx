import React, { createContext, useContext, useState } from 'react';
import { z } from 'zod';

export const cadastroSchema = z.object({
  // Step 1
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  
  // Step 2
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  birthdate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data inválida (DD/MM/AAAA)'),
  
  // Step 3
  cep: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido (XXXXX-XXX)'),
  state: z.string().min(2, 'Estado inválido'),
  cityName: z.string().min(2, 'Cidade deve ter no mínimo 2 caracteres'),
});

export type CadastroFormData = z.infer<typeof cadastroSchema>;

type CadastroContextType = {
  formData: Partial<CadastroFormData>;
  updateFormData: (data: Partial<CadastroFormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
};

const CadastroContext = createContext<CadastroContextType | undefined>(undefined);

export const SignUpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<Partial<CadastroFormData>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const updateFormData = (data: Partial<CadastroFormData>) => {
    setFormData(prevData => ({ ...prevData, ...data }));
  };

  return (
    <CadastroContext.Provider value={{ 
      formData, 
      updateFormData, 
      currentStep, 
      setCurrentStep,
      totalSteps 
    }}>
      {children}
    </CadastroContext.Provider>
  );
};

export const useCadastroContext = () => {
  const context = useContext(CadastroContext);
  if (context === undefined) {
    throw new Error('useCadastroContext must be used within a CadastroProvider');
  }
  return context;
};