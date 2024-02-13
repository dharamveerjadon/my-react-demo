import React, { useState } from 'react';
import "./RadioGroup.css";

interface RadioGroupProps {
  options: string[];
  onSelectionChange: (selectedOption: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, onSelectionChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelectionChange(value);
  };

  return (
    <div className='group-wrapper'>
      {options.map((option) => (
        <label className='items' key={option}>
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={handleOptionChange}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;