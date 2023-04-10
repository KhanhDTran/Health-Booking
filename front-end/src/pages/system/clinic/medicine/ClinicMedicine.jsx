import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Select from "react-select";
import { toast } from "react-toastify";

export default function ClinicMedicine(props) {
  const dispatch = useDispatch();
  // useState
  const [x, setX] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");

  // UseEffect
  useEffect(() => {}, []);

  // function
  function a() {}

  async function b() {}

  return (
    <>
      <div className="divider"></div>
      <div className="w-full flex justify-center text-4xl">
        <span> Danh sách thuốc </span>
      </div>

      <div className="w-full flex justify-center text-4xl">
        <select
          className="select select-info w-full max-w-xs "
          onChange={(e) => {
            if (e.target.value === "1") props.setShowMedicine(false);
            if (e.target.value === "2") props.setShowMedicine(true);
          }}
        >
          <option value={"1"}>Ẩn danh sách thuốc</option>
          <option value={"2"}>Hiện danh sách thuốc</option>
        </select>
      </div>

      {props.showMedicine && (
        <div className="p-4 m-4 ">
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tên thuốc....."
                  className="input input-bordered input-info w-full "
                />
              </div>
              {/* name */}

              {/* Số lượng */}
              <div className="form-control gap-2">
                <label htmlFor="quantity" className="pl-2">
                  Số lượng
                </label>
                <input
                  type="text"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Số lượng"
                  className="input input-bordered input-info w-full "
                />
              </div>
              {/* Số lượng */}

              {/* Ghi chú */}
              <div className="form-control gap-2">
                <label htmlFor="note" className="pl-2">
                  Ghi chú
                </label>
                <textarea
                  type="number"
                  id="note"
                  placeholder="Ghi chú...."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="input input-bordered  input-info w-full"
                />
              </div>
              {/* Ghi chú */}
            </div>
          </>
          <div>
            <button
              className="btn btn-info"
              onClick={() => props.addMedicine(name, quantity, note)}
            >
              Thêm thuốc
            </button>
          </div>
          <div className="overflow-x-auto m-4  shadow-2xl">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Tên thuốc</th>
                  <th>Số lượng</th>
                  <th>Ghi chú</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.record.medicines &&
                  props.record.medicines.map((item, index) => {
                    return (
                      <tr key={index + 1}>
                        <th> {index + 1} </th>
                        <td> {item.name} </td>
                        <td> {item.quantity} </td>
                        <td> {item.note} </td>
                        <td>
                          <button
                            className="btn btn-ghost btn-xs"
                            onClick={() => props.deleteMedicine(item)}
                          >
                            <i className="fa-solid fa-trash-can text-xl"></i>
                          </button>{" "}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
