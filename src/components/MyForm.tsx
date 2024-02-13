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
    resetForm();
  };

  const resetForm = () => {
    setFormData({
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
  }
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
          <label htmlFor='Model'>Model</label>
          <input
            type="text"
            name="model"
            placeholder='Model'
            value={formData.model}
            onChange={handleInputChange}
          />
          </div>
          <div className="section">
          <label htmlFor='Location'>Location</label>
          <Autocomplete suggestions={jsonData?.locations ?? []} onHandleSelection={handleSelectionAutocomplete} type={'location'} value={formData?.location}/>
          </div>
        </div>
        <div className="row">
        <div className="section">
          <label htmlFor='Color'>Color</label>
          <Autocomplete suggestions={jsonData?.colors ?? []} type='color' onHandleSelection={handleSelectionAutocomplete}value={formData?.color}/>
           </div>
           <div className="section">
           <label htmlFor='Owners'>No Of Owners</label>
          <Autocomplete suggestions={jsonData?.owners ?? []} type='noOfOwners' onHandleSelection={handleSelectionAutocomplete} value={formData?.noOfOwners}/>
           </div>
        </div>
        <div className="row">
        <div className="section">
        <label htmlFor='Manufacture'>Year Of Manufacture</label>
          <Autocomplete suggestions={jsonData?.yearOfManufacture ?? []} type='yearOfManufacture' onHandleSelection={handleSelectionAutocomplete} value={formData?.yearOfManufacture}/>
          </div>
          <div className="section">
          <label htmlFor='Transmission'>Transmission</label>
          <Autocomplete suggestions={jsonData?.transmission ?? []} type='transmission' onHandleSelection={handleSelectionAutocomplete} value={formData?.transmission}/>
          </div>
        </div>
        <div className="row">
        <div className="section">
        <label htmlFor='Insurance'>Insurance Valid Upto</label>
          <Autocomplete suggestions={jsonData?.insuranceValidUpto ?? []} onHandleSelection={handleSelectionAutocomplete} type='insuranceValidUpto' value={formData?.insuranceValidUpto}/>
           </div>
           <div className="section">
           <label htmlFor='Fitments'>External Fitments</label>
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
        <label htmlFor='Brand'>Brand</label>
          <input
            type="text"
            name="brand"
            placeholder='Brand'
            value={formData.brand}
            onChange={handleInputChange}
          />
          </div>
          <div className="section">
          <label htmlFor='Body'>Body Type</label>
          <Autocomplete suggestions={jsonData?.bodyType ?? []} onHandleSelection={handleSelectionAutocomplete} type='bodyType' value={formData?.bodyType}/>
          </div>
        </div>
        <div className="row">
        <div className="section">
        <label htmlFor='Kms'>Kms</label>
          <input
            type="text"
            name="kms"
            placeholder='Kms'
            value={formData.kms}
            onChange={handleInputChange}
          />
          </div>
          <div className="section">
          <label htmlFor='Fuel'>Fuel Type</label>
          <Autocomplete suggestions={jsonData?.fuelType ?? []} onHandleSelection={handleSelectionAutocomplete} type='fuelType' value={formData?.fuelType}/>
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