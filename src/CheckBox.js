import CheckBoxItem from "./CheckBoxItem";
import React, { Component, useState, useEffect } from "react";

function CheckBox(props) {

    let [values, setValues] = useState([]);
    let countryValues = [ {id: 1, value: "India", isChecked: false},
    {id: 2, value: "United States", isChecked: false},
    {id: 3, value: "United Kingdom", isChecked: false},
    {id: 4, value: "Australia", isChecked: false},
    {id: 5, value: "Canada", isChecked: false}];


    let courseValues = [{id: 7, value: "Engineering", isChecked: false},
    {id: 8, value: "Medical", isChecked: false}];

    let handleCheckChildElement = (name, value) => {
        return (event) => {
            let updatedValues =
          values.map(item =>{
            if (item.value == value) {
              return{"item": item.item, "value": item.value, "isChecked": !item.isChecked};
            } else {
              return {"item": item.item, "value": item.value, "isChecked": item.isChecked};
            }
            });
            setValues(updatedValues);
            props.onChangeFunction(props.typeOfCheckBox, updatedValues);
        }   
      };

      useEffect(() => {
          console.log("Hello");
          console.log(props.typeOfCheckBox);
            switch(props.typeOfCheckBox) {
                case "Country" :    console.log("od");
                                   setValues(countryValues);
                                    break;

                case "Course" :     setValues(courseValues);
                                    break;
            }
      },[]);
      
    return(
    <div className={"filter "+props.typeOfCheckBox}>
        <h3> {props.typeOfCheckBox} </h3>
        <ul>
        { 
            /*values.map((item, index) => {
               return( <li>
                    {item.value}
                </li>)
            })*/
            values.map((item,index) => {
                return( 
                <CheckBoxItem
                    handleCheckChildElement={handleCheckChildElement(
                    props.typeOfCheckBox,
                    item.value,
                    )}
                    value={item.value}
                    id={index}
                    isChecked={item.isChecked}
                />);
            })
        }
        </ul>
  </div>
    );

}

export default CheckBox;