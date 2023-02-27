import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../../components/AdminHeader";
import Err401Page from "../../../../components/Err401Page";
import Modal_C_Clinic from "./Modal_C_Clinic";
import Modal_E_Clinic from "./Modal_E_Clinic";
import { fetchAllSpecialties } from "../../../../store/features/fetchDataSlice";

export default function ManageClinic() {
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state.user);
  const [openMCreateClinic, setopenMCreateClinic] = useState(false);

  useEffect(() => {
    dispatch(fetchAllSpecialties());
  }, []);

  useEffect(() => {
    if (openMCreateClinic) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style = "";
    }
  }, [openMCreateClinic]);

  return (
    <>
      <div>
        {role && role === "admin" ? (
          <>
            <AdminHeader />
            <div className="container mx-auto flex flex-col pb-4">
              <div className="title text-lg lg:text-3xl p-4 m-4 bg-base-300 rounded-box text-center">
                <span className="">Phòng Khám Chuyên Khoa</span>
              </div>
              <div className="container mx-auto flex justify-center">
                <button
                  className="btn btn-active btn-primary"
                  onClick={() => setopenMCreateClinic(true)}
                >
                  Tạo mới phòng khám
                </button>
              </div>
              {/* --------------------------- */}
              <div className="divider"></div>{" "}
              {/* --------------------------- */}
              <div></div>
            </div>
            {openMCreateClinic && (
              <Modal_C_Clinic
                openMCreateClinic={openMCreateClinic}
                setopenMCreateClinic={setopenMCreateClinic}
              />
            )}
          </>
        ) : (
          <Err401Page />
        )}
      </div>
    </>
  );
}
