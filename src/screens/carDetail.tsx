
import React from "react";
import { useMyContext } from '../MyContextProvider';
import './cardDetail.css';
import Card from "../components/Card";

interface CarDetailProps {}

const CarDetail : React.FC<CarDetailProps> = () => {
  const { myObject } = useMyContext();

    return (
      <div className="card-final-detail">
      <Card item={myObject} onClick={() => {}}/>
    </div>
      );

}

export default CarDetail;
