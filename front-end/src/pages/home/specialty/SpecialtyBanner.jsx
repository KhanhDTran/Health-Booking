import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SpecialtyBanner(props) {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  // useState

  // UseEffect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // function
  function a() {}

  return (
    <>
      {props.specialty && (
        <div
          className="w-96 bg-base-100 w-full shadow-xl rounded-box hover:bg-base-300 hover:cursor-pointer"
          onClick={() => {
            navigate(
              `/specialty/${props.specialty._id}/${props.specialty.name}`
            );
          }}
        >
          <div className="w-full flex flex-col lg:flex-row">
            <div className="avatar flex justify-center p-4 w-full lg:w-1/2">
              <div className="w-52 rounded-full">
                <img src={props.specialty.image} />
              </div>
            </div>
            {/* ------- */}
            <div className="flex flex-col p-4 gap-4 text-3xl">
              <h1> {props.specialty.name} </h1>
              <p> Mô tả: {props.specialty.description} </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
