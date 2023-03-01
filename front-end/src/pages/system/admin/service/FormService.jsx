import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

import _ from "lodash";
import Select from "react-select";
import { toast } from "react-toastify";

export default function FormService(props) {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {/* name */}
        <div className="form-control gap-2 flex ">
          <label htmlFor="name" className="pl-2">
            Tên
          </label>
          <input
            type="text"
            id="name"
            value={props.name}
            onChange={(e) => props.setName(e.target.value)}
            placeholder="Tên dịch vụ....."
            className="input input-bordered input-info w-full "
          />
        </div>
        {/* name */}

        {/* Đơn vị */}
        <div className="form-control gap-2">
          <label htmlFor="Đơn vị" className="pl-2">
            Đơn vị
          </label>
          <input
            type="text"
            id="Đơn vị"
            value={props.unit}
            onChange={(e) => props.setUnit(e.target.value)}
            placeholder="VD: lần, cái...."
            className="input input-bordered input-info w-full "
          />
        </div>
        {/* Đơn vị */}

        {/* Đơn giá */}
        <div className="form-control gap-2">
          <label htmlFor="unitPrice" className="pl-2">
            Đơn giá (x 1000 VNĐ)
          </label>
          <label className="input-group ">
            <input
              type="number"
              id="unitPrice"
              value={props.unitPrice}
              onChange={(e) => props.setUnitPrice(e.target.value)}
              className="input input-bordered  input-info w-full"
            />
            <span>VNĐ</span>
          </label>
        </div>
        {/* Đơn giá */}
      </div>
    </>
  );
}
