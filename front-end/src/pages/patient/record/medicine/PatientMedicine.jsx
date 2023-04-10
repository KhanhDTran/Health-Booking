import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

export default function PatientMedicine(props) {
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
      <div className="divider"></div>
      <div className="text-4xl  m-4 flex justify-center">Danh sách thuốc</div>
      <div>
        <div className="overflow-x-auto m-4  shadow-2xl">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Tên thuốc</th>
                <th>Số lượng</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {props.medicines &&
                props.medicines.map((item, index) => {
                  return (
                    <tr key={index + 1}>
                      <th> {index + 1} </th>
                      <td> {item.name} </td>
                      <td> {item.quantity} </td>
                      <td> {item.note} </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
