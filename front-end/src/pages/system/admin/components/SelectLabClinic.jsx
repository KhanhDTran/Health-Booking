import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { customStyles } from "../../../../utils/CommonUtils";
import _ from "lodash";
import Select from "react-select";
import { toast } from "react-toastify";

export default function SelectLabClinic(props) {
  const dispatch = useDispatch();
  // useState
  const [x, setX] = useState("");

  // UseEffect
  useEffect(() => {}, []);

  // function
  function a() {}

  async function b() {}

  return (
    <>
      {" "}
      <div className="select-lab-clinic flex flex-col lg:flex-row">
        {/* Select clinic */}
        <div className="container mx-auto flex justify-center m-4">
          <div className="w-64 lg:w-96 ">
            <label htmlFor="">Phòng khám chuyên khoa</label>
            <Select
              isClearable={true}
              className="my-react-select-container"
              classNamePrefix="my-react-select"
              options={props.clinicOptions}
              isDisabled={props.selectedLab ? true : false}
              styles={customStyles}
              placeholder={"Phòng chuyên khoa....."}
              onChange={(e) => {
                if (e) {
                  props.setSelectedClinic(_.find(props.clinics, { _id: e.value }));
                } else {
                  props.setSelectedClinic(null);
                }
              }}
            />{" "}
          </div>
        </div>
        {/* Select clinic */}
        {/* Select lab */}
        <div className="container mx-auto flex justify-center m-4 w-50">
          <div className="w-64 lg:w-96 ">
            <label htmlFor="">Phòng khám lâm sàng</label>
            <Select
              isClearable={true}
              isDisabled={props.selectedClinic ? true : false}
              className="my-react-select-container"
              classNamePrefix="my-react-select"
              options={props.labOptions}
              styles={customStyles}
              placeholder={"Phòng lâm sàng....."}
              onChange={(e) => {
                if (e) {
                  props.setSelectedLab(_.find(props.labs, { _id: e.value }));
                } else {
                  props.setSelectedLab(null);
                }
              }}
            />{" "}
          </div>
        </div>
        {/* Select lab */}
      </div>
    </>
  );
}
