import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import './Autocomplete.css'; // Import the CSS file

interface AutocompleteProps {
  suggestions: string[];
  onHandleSelection: (name: string, value: string) => void;
  type: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ suggestions, onHandleSelection, type }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter suggestions based on input value
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    onHandleSelection(type, suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Handle Enter key press to select the first suggestion
    if (event.key === 'Enter' && filteredSuggestions.length > 0) {
      handleSelectSuggestion(filteredSuggestions[0]);
    }
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {showSuggestions && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelectSuggestion(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
