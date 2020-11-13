import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import CheckBox from "./CheckBox";
import "./css/App.css";
import { Data } from "./model/database";

function App() {
  const [pageState, setPageState] = useState(0);
  const [filters, setFilters] = useState([]);
  const [listCourses, setListCourses] = useState([]);
  const [suggestionItems, setSuggestionItems] = useState([]);

  const [countryCheckBoxes, setCountryCheckBoxes] = useState([
    { id: 1, value: "India", isChecked: false },
    { id: 2, value: "US", isChecked: false },
    { id: 3, value: "UK", isChecked: false },
    { id: 4, value: "Chine", isChecked: false },
    { id: 5, value: "Australia", isChecked: false },
    { id: 6, value: "Canada", isChecked: false },
  ]);
  const [courseCheckBoxes, setCourseCheckBoxes] = useState([
    { id: 7, value: "Engineering", isChecked: false },
    { id: 8, value: "Medical", isChecked: false },
    { id: 9, value: "Ms", isChecked: false },
    { id: 10, value: "Philosophy", isChecked: false },
  ]);
  const [feesCheckBox, setFeesCheckBox] = useState([
    { id: 11, value: 10000, isChecked: false },
    { id: 12, value: 20000, isChecked: false },
    { id: 13, value: 30000, isChecked: false },
    { id: 14, value: 40000, isChecked: false },
    { id: 15, value: 50000, isChecked: false },
  ]);
  const [streamCheckBox, setStreamCheckBox] = useState([
    { id: 16, value: "Science", isChecked: false },
    { id: 17, value: "Maths", isChecked: false },
    { id: 18, value: "Commerce", isChecked: false },
    { id: 19, value: "Arts", isChecked: false },
  ]);

  let onChangeFilterFunction = (filterType, values) => {
    let selectedOpts = [];
    switch (filterType) {
      case "Country":
        selectedOpts = values.filter((item) => {
          return item.isChecked;
        });
        setListCourses(
          listCourses.filter((item) => {
            let hasMatched = false;
            for (let i = 0; i < selectedOpts.length; i++) {
              console.log(selectedOpts[i].value, item.country);
              if (selectedOpts[i].value == item.country) {
                hasMatched = true;
                break;
              }
            }
            return hasMatched;
          })
        );
        break;
      case "Course":
        selectedOpts = values.filter((item) => {
          return item.isChecked;
        });
        setListCourses(
          listCourses.filter((item) => {
            let hasMatched = false;
            for (let i = 0; i < selectedOpts.length; i++) {
              console.log(selectedOpts[i].value, item.courseName);
              if (selectedOpts[i].value == item.courseName) {
                hasMatched = true;
                break;
              }
            }
            return hasMatched;
          })
        );
        break;
    }
  };

  useEffect(() => {
    console.log(Data);
    setListCourses(Data);
  }, []);


  useEffect(()=> {
        // do some filtering 
    if(listCourses.length > 0) {
      console.log(listCourses);
      let suggested = Data.filter(item => {
          return (item.courseName == listCourses[0].courseName && 
                  item.country != listCourses[0].country);
      });

      setSuggestionItems(suggested);
    }
  }, [listCourses]);

  function suggestions() {
    return (
      <div className="filter fees">
        <h3>Fees</h3>
        <ul>
          {feesCheckBox.map((item) => {
            return (
              <CheckBox
                handleCheckChildElement={handleCheckChildElement(
                  "fees",
                  item.value
                )}
                value={"<" + item.value}
              />
            );
          })}
        </ul>
      </div>
    );
  }

  function handleCheckChildElement(checkBoxName, value) {
    return (event) => {
      console.log({ event, checkBoxName, value });
      setFilters((prevState) => {
        prevState.push({ checkBoxName, value });
        return prevState;
      });
      if (checkBoxName == "Country") {
        let countries = countryCheckBoxes;
        countries.forEach((item) => {
          if (item.value == event.target.value) {
            console.log("here");
            item.isChecked = event.target.checked;
          }
        });
        setCountryCheckBoxes(countries);
      }
      console.log(filters);
    };
  }

  let page0 = function () {
    return (
      <div className="container-app-filters">
        <div className="heading">
          <h2>Select the filters: </h2>
        </div>
        <CheckBox
          typeOfCheckBox="Country"
          onChangeFunction={onChangeFilterFunction}
        />
        <CheckBox
          typeOfCheckBox="Course"
          onChangeFunction={onChangeFilterFunction}
        />
        <div className="submission">
          <button
            className="btn btn-1 btn-sep icon-info"
            onClick={(_) => setPageState(1)}
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  let page1 = function () {
    return (
      <div className="app-container">
        <div className="main-content">
          <div className="container">
            {listCourses.map((item) => {
              return (
                <div className="courseCard">
                  <div className="logo">
                    <img src={item.universityLogo} />
                  </div>
                  <div className="details">
                  <div className="uni-name">{item.universityName} </div>
                    <div className="detail-field">
                        <div className="label">Country: </div>
                        <div className="value">{item.country}</div>
                    </div>
                    <div className="detail-field">
                        <div className="label">Course: </div>
                        <div className="value">{item.courseName}</div>
                    </div>
                    <div className="detail-field">
                        <div className="label">Fees: </div>
                        <div className="value">{item.fees}</div>
                    </div>
                    <table>
                      <tr>
                        <th> Exams </th>
                        <th> Cutoff </th>
                      </tr>
                      {Object.keys(item.exams).map((it) => {
                        return (
                          <tr>
                            <td>{it}</td>
                            <td>{item.exams[it]}</td>
                          </tr>
                        );
                      })}
                    </table>
                    <a href={item.universityLink}> here </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="suggestionContent">
        <div className="suggestion-label">Suggestions: </div>
        <div className="suggestionBox">
          
        {suggestionItems.map((item) => {
              return (
                <div className="suggCourseCard">
                  <div className="logo">
                    <img src={item.universityLogo} />
                  </div>
                  <div className="details">
                  <div className="uni-name">{item.universityName} </div>
                    <div className="detail-field">
                        <div className="label">Country: </div>
                        <div className="value">{item.country}</div>
                    </div>
                    <div className="detail-field">
                        <div className="label">Course: </div>
                        <div className="value">{item.courseName}</div>
                    </div>
                    <div className="detail-field">
                        <div className="label">Fees: </div>
                        <div className="value">{item.fees}</div>
                    </div>
                    <table>
                      <tr>
                        <th> Exams </th>
                        <th> Cutoff </th>
                      </tr>
                      {Object.keys(item.exams).map((it) => {
                        return (
                          <tr>
                            <td>{it}</td>
                            <td>{item.exams[it]}</td>
                          </tr>
                        );
                      })}
                    </table>
                    <a href={item.universityLink}> here </a>
                  </div>
                </div>
              );
            })}
        </div>
        </div>
      </div>
    );
  };
  return (
    <div className="app">
      <div className="app-header">
        <img src="https://i.ibb.co/rv13sbV/graphic-careers.png"></img>
        <div className="app-name">Career Counselor</div>
      </div>
      {pageState == 1 ? page1() : page0()}
    </div>
  );
}
export default App;
