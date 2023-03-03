import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function TimeListButton(props) {
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
      <div className="time-list-button">
        <div className="text-center text-3xl p-4">
          <span>{props.dayninght}</span>
          <input
            type="checkbox"
            checked={props.check}
            disabled={
              !props.selectedClinic && !props.selectedLab ? true : false
            }
            className="checkbox checkbox-info ml-4"
            onChange={() => {
              if (props.check) {
                props.clearOnTimeList(props.timeList);
                props.setCheck(false);
              } else {
                props.setOnTimeList(props.timeList);
                props.setCheck(true);
              }
            }}
          />
        </div>
        <div className=" bg-base-200 bg-base-200  flex flex-wrap gap-4 p-4 justify-center ">
          {props.timeList.map((item) => {
            return (
              <button
                disabled={
                  !props.selectedClinic && !props.selectedLab ? true : false
                }
                className={
                  item.isOn
                    ? "btn btn-info w-36 text-white"
                    : "btn btn-outline btn-info w-36"
                }
                key={item.hour}
                onClick={() => {
                  item.isOn = !item.isOn;
                  props.setChoose(!props.choose);
                }}
              >
                {item.hour}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
