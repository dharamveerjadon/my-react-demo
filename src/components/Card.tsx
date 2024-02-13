// Card.tsx
import React from 'react';
import './Card.css'
import { Car } from '../types/Car';

interface CardProps {
    item: Car,
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ item, onClick }) => {
  return (
    <button className='card-detail' onClick={onClick}>
      <p><label>Model</label><span>{item.model}</span></p>
      <p><label>Location</label><span>{item.location}</span></p>
      <p><label>Color</label><span>{item.color}</span></p>
      <p><label>No Of Owners</label><span>{item.noOfOwners}</span></p>
      <p><label>Year Of Manufacture</label><span>{item.yearOfManufacture}</span></p>
      <p><label>Transmission</label><span>{item.transmission}</span></p>
      <p><label>Insurance Valid Upto</label><span>{item.insuranceValidUpto}</span></p>
      <p><label>External Fitments</label><span>{item.externalFitments}</span></p>
      <p><label>Kms</label><span>{item.kms}</span></p>
      <p><label>Brand</label><span>{item.brand}</span></p>
      <p><label>Body Type</label><span>{item.bodyType}</span></p>
    </button>
  );
};

export default Card;