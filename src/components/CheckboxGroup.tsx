import React, { useState, ChangeEvent } from 'react';

interface CheckboxGroupProps {
  options: string[];
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    // Initialize with all checkboxes unchecked
    options.reduce((acc : any, option) => {
      acc[option] = false;
      return acc;
    }, {})
  );

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: checked,
    }));
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option}>
          <input
            type="checkbox"
            id={option}
            name={option}
            checked={checkedItems[option]}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
      <p>Checked Items: {JSON.stringify(checkedItems)}</p>
    </div>
  );
};

export default CheckboxGroup;