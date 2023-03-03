import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DoctorBanner(props) {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  // UseEffect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // function
  function a() {}

  return (
    <>
      {props.doctor && (
        <div
          className="w-96 bg-base-100 w-full shadow-xl rounded-box hover:bg-base-300 hover:cursor-pointer"
          onClick={() => {
            navigate(
              `/doctor/${props.doctor._id}/${props.doctor.position}/${props.doctor.name}`
            );
          }}
        >
          <div className="w-full flex flex-col lg:flex-row">
            <div className="avatar flex justify-center p-4 w-full lg:w-1/2">
              <div className="w-52 rounded-full">
                <img src={props.doctor.image} />
              </div>
            </div>
            {/* ------- */}
            <div className="flex flex-col p-4 gap-4 ">
              <h1 className="text-3xl">
                {props.doctor.position} {props.doctor.name}
              </h1>
              <p>
                <b>Chuyên khoa:</b> {props.doctor.specialty.name}
              </p>
              <p>
                <b>Giới thiệu:</b> {props.doctor.description}
              </p>
              <p>
                <b>Năm Sinh:</b> {props.doctor.age}
              </p>
              <p>
                <b>Email: </b> {props.doctor.email}
              </p>
              <p>
                <b>Điện thoại: </b> {props.doctor.phone}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
