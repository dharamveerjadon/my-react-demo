import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCar } from '../redux/carSlice';
import { useNavigate } from 'react-router-dom';

import "./CarLogoList.css"; // Create this file for styling
import MyForm from "./MyForm";
import { carBrands } from "../utils/utils";
import { Car } from "../types/Car";

interface CarLogoListProps {}

interface BrandItem {
  name: string;
  logo: string;
  id: number;
}
const CarLogoList: React.FC<CarLogoListProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedBrand, setSelectedBrand] = useState<BrandItem>();
  const onSubmitHandle = (formData: Car) => {
    // Dispatch an action to store the data in Redux
    dispatch(addCar(formData));
    console.log("Form submitted with data:", formData);
  };


  const handleViewListing = () => {
    navigate('./carListing');
  }
  return (
    <div className="car-logo-list">
      <div className="logo-wrapper">
        {carBrands.map((brand) => (
          <button
            key={brand.name}
            className={
              selectedBrand?.id === brand.id
                ? "car-logo-item-selected"
                : "car-logo-item"
            }
            onClick={() => setSelectedBrand(brand)}
          >
            <img src={brand.logo} alt={brand.name} className="car-logo" />
            <p className="car-name">{brand.name}</p>
          </button>
        ))}
      </div>
      <div className="buttonContainer">
        <button className="buttonViewAll" onClick={handleViewListing}>View Listing</button>
      </div>
      <h2 className="brand-title">{selectedBrand?.name}</h2>
      {selectedBrand && <MyForm onSubmitHandle={onSubmitHandle} />}
    </div>
  );
};

export default CarLogoList;
