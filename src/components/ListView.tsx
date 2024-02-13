// ListView.tsx
import React from 'react';
import Card from './Card';
import './ListView.css'
import { Car } from '../types/Car';
import { useNavigate } from 'react-router-dom';

interface ListViewProps {
  items: Car[];
  setMyObject: (item: Car) => void;
}

const ListView: React.FC<ListViewProps> = ({ items, setMyObject }) => {
  const navigate = useNavigate();
  return (
    <div>
      {items.map((item) => (
        <Card key={item.model}item={item} onClick={() => {
          setMyObject(item);
          navigate('/carDetail');
        }}/>
      ))}
    </div>
  );
};

export default ListView;