import React, { useEffect, useState } from 'react';
import Autocomplete from './Autocomplete';
import './MyForm.css'; 
import { Car } from '../types/Car';

interface MyFormProps {
    onSubmitHandle: (data: Car) => void
    // Add any additional props as needed
  }
  interface Data {
    bodyType: string[],
    transmission: string[],
    fuelType: string[],
    owners: string[],
    locations: string[],
    colors: string[],
    yearOfManufacture: string[],
    insuranceValidUpto: string[],
  
  }
const MyForm: React.FC<MyFormProps> = ({onSubmitHandle}) => {
  // State to store input data
  const [formData, setFormData] = useState({
    model: '',
    location: '',
    color: '',
    noOfOwners: '',
    yearOfManufacture: '',
    transmission: '',
    insuranceValidUpto: '',
    externalFitments: '',
    kms: '',
    brand: '',
    bodyType: '',
    fuelType: ''
  });

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [jsonData, setJsonData] = useState<Data | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/filter.json'); // Assuming data.json is in the public folder
        const data: Data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching JSON data', error);
      }
    };

    fetchData();
  }, []);
  const handleImageChange = (e : any) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitHandle(formData);    
  };

  const handleSelectionAutocomplete = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  return (
    <div>
      <div className="container">
      <div className="row">
      <div className="section">
          <label>Model</label>
          <input
            type="text"
            name="model"
            placeholder='Model'
            value={formData.model}
            onChange={handleInputChange}
          />
          </div>
          <div className="section">
          <label>Location</label>
          <Autocomplete suggestions={jsonData?.locations ?? []} onHandleSelection={handleSelectionAutocomplete} type={'location'}/>
          </div>
        </div>
        <div className="row">
        <div className="section">
          <label>Color</label>
          <Autocomplete suggestions={jsonData?.colors ?? []} type='color' onHandleSelection={handleSelectionAutocomplete}/>
           </div>
           <div className="section">
           <label>No Of Owners</label>
          <Autocomplete suggestions={jsonData?.owners ?? []} type='noOfOwners' onHandleSelection={handleSelectionAutocomplete}/>
           </div>
        </div>
        <div className="row">
        <div className="section">
          <label>Year Of Manufacture</label>
          <Autocomplete suggestions={jsonData?.yearOfManufacture ?? []} type='yearOfManufacture' onHandleSelection={handleSelectionAutocomplete}/>
          </div>
          <div className="section">
          <label>Transmission</label>
          <Autocomplete suggestions={jsonData?.transmission ?? []} type='transmission' onHandleSelection={handleSelectionAutocomplete}/>
          </div>
        </div>
        <div className="row">
        <div className="section">
          <label>Insurance Valid Upto</label>
          <Autocomplete suggestions={jsonData?.insuranceValidUpto ?? []} onHandleSelection={handleSelectionAutocomplete} type='insuranceValidUpto'/>
           </div>
           <div className="section">
           <label>External Fitments</label>
          <input
            type="text"
            name="externalFitments"
            placeholder='External Fitments'
            value={formData.externalFitments}
            onChange={handleInputChange}
          />
           </div>
        </div>
        <div className="row">
        <div className="section">
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            placeholder='Brand'
            value={formData.brand}
            onChange={handleInputChange}
          />
          </div>
          <div className="section">
          <label>Body Type</label>
          <Autocomplete suggestions={jsonData?.bodyType ?? []} onHandleSelection={handleSelectionAutocomplete} type='bodyType'/>
          </div>
        </div>
        <div className="row">
        <div className="section">
          <label>Kms</label>
          <input
            type="text"
            name="kms"
            placeholder='Kms'
            value={formData.kms}
            onChange={handleInputChange}
          />
          </div>
          <div className="section">
          <label>Fuel Type</label>
          <Autocomplete suggestions={jsonData?.fuelType ?? []} onHandleSelection={handleSelectionAutocomplete} type='fuelType'/>
          </div>
        </div>
        <div className="row">
          <div className="section">
          <input type="file" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: '100%', maxHeight: '400px' }}
          />
        </div>
      )}
          </div>
        </div>
        
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '12px'}}>
      <div className="buttonContainer">
        <button className={formData?.model ? "buttonSelected": "buttonUnSelected"} onClick={handleSubmit}>Submit</button>
      </div>
      </div>
    </div>
  );
};

export default MyForm;