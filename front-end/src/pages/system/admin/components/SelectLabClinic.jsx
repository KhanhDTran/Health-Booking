import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { customStyles } from "../../../../utils/CommonUtils";

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
                  props.setSelectedClinic(
                    _.find(props.clinics, { _id: e.value })
                  );
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
