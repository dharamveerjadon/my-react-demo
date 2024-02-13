// MyContext.tsx
import { createContext, useContext, ReactNode, useState } from 'react';
import { Car } from './types/Car';

interface MyContextProps {
  myObject: any; // Replace 'any' with the type of your object
  setMyObject: (obj: Car) => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [myObject, setMyObject] = useState<Car>();

  return (
    <MyContext.Provider value={{ myObject, setMyObject }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};