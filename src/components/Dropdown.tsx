import React, { useState } from 'react';
import './Dropdown.css'

interface DropdownProps {
  options: string[];
  onSelectionChange: (value: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelectionChange }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelectionChange(option);
  };

  return (
    <div className="dropdown">
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || 'Select an option'}
      </div>
      {isOpen && (
        <div className='options-wrapper'>
        <ul className="options">
          {options.map((option) => (
            <li key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;