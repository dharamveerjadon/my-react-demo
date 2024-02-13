import React, { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import RadioGroup from "../components/RadioGroup";
import ListView from "../components/ListView";
import "./carListing.css";
import { Car } from "../types/Car";
import { useSelector } from "react-redux";
import { useMyContext } from "../MyContextProvider";
import { RootState } from "../store";

interface CarSearchProps {}
interface Data {
  bodyType: string[];
  transmission: string[];
  fuelType: string[];
  owners: string[];
  locations: string[];
  colors: string[];
  yearOfManufacture: string[];
  insuranceValidUpto: string[];
}

const CarSearch: React.FC<CarSearchProps> = () => {
  const { setMyObject } = useMyContext();

  const cars = useSelector((state: RootState) => state.car.cars);

  const [jsonData, setJsonData] = useState<Data | null>(null);
  const [filteredData, setFilteredData] = useState<Car[] | null>(null);
  const [updatedData, setUpdatedData] = useState<Car[] | null>(cars);
  const [locationValue, setLocationValue] = useState<string>("");
  const [ownerValue, setOwnerValue] = useState<string>("");
  const [transmissionValue, setTransmissionValue] = useState<string>("");
  const [fuelTypeValue, setFuelTypeValue] = useState<string>("");
  const [bodyTypeValue, setBodyTypeValue] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/filter.json");
        const data: Data = await response.json();
        setJsonData(data);

        setFilteredData(cars);
        setUpdatedData(cars);
      } catch (error) {
        console.error("Error fetching JSON data", error);
      }
    };

    fetchData();
  }, [cars]);

  useEffect(() => {
    const filterData = filteredData?.filter(
      (item) =>
      (locationValue === '' || locationValue === item.location) &&
      (transmissionValue === '' || transmissionValue === item.transmission) &&
      (fuelTypeValue === '' || fuelTypeValue === item.fuelType) &&
      (ownerValue === '' || ownerValue === item.noOfOwners) && 
      (bodyTypeValue === '' || bodyTypeValue === item.bodyType)
    );
    setUpdatedData(filterData ?? []);
  }, [ownerValue, transmissionValue, fuelTypeValue, locationValue, bodyTypeValue]);

  const onHandleOwners = (value: string) => {
    setOwnerValue(value);
  };

  const onHandleLocation = (value: string) => {
    setLocationValue(value);
  };

  const onHandleFuelType = (value: string) => {
    setFuelTypeValue(value);
  };

  const onHandleBodyType = (value: string) => {
    setBodyTypeValue(value);
  };
  const onHandleTransmission = (value: string) => {
    setTransmissionValue(value);
  };
  return (
    <div className="inputContainer">
      <div className="filter-section">
        <h4>Location</h4>
        <Dropdown options={jsonData?.locations ?? []} onSelectionChange={onHandleLocation}/>
        <h4>Owners</h4>
        <RadioGroup
          options={jsonData?.owners ?? []}
          onSelectionChange={onHandleOwners}
        />
        <h4>Fuel Type</h4>
        <RadioGroup
          options={jsonData?.fuelType ?? []}
          onSelectionChange={onHandleFuelType}
        />
         <h4>Body Type</h4>
        <RadioGroup
          options={jsonData?.bodyType ?? []}
          onSelectionChange={onHandleBodyType}
        />
        <h4>transmission</h4>
        <RadioGroup
          options={jsonData?.transmission ?? []}
          onSelectionChange={onHandleTransmission}
        />
      </div>
      <div style={{ backgroundColor: "#000", width: "2px" }} />

      {updatedData?.length ? <div className="list-wrapper">
        <ListView items={updatedData ?? []} setMyObject={setMyObject} />
      </div> : <h2 className="list-wrapper">No Result found</h2>}
    </div>
  );
};

export default CarSearch;
