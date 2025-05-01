// context/BusinessInfoContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

type BusinessInfo = {
  // your business info type
  phone?: string;
  email?: string;
  address?: string;
};

type ContextType = {
  info: BusinessInfo;
  setInfo: React.Dispatch<React.SetStateAction<BusinessInfo>>;
};

const BusinessInfoContext = createContext<ContextType | undefined>(undefined);

export const BusinessInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [info, setInfo] = useState<BusinessInfo>({});
  return (
    <BusinessInfoContext.Provider value={{ info, setInfo }}>
      {children}
    </BusinessInfoContext.Provider>
  );
};

export const useBusinessInfo = () => {
  const context = useContext(BusinessInfoContext);
  if (!context) {
    throw new Error("useBusinessInfo must be used within BusinessInfoProvider");
  }
  return context;
};
