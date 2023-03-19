import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import PatientHeader from "../../components/PatientHeader";
import { fetchRecords } from "../../store/features/fetchDataSlice";
import PatientRecordInfor from "../system/clinic/PatientRecordInfor";
import PatientLabsTable from "./PatientLabsTable";
import PatientTableLabServices from "./PatientTableLabServices";
import ModalLabBooking from "./ModalLabBooking";

export default function PatientDetailRecord() {
  const dispatch = useDispatch();
  const params = useParams();
  const { booking_id } = params;

  // useState
  const { role, user } = useSelector((state) => state.user);
  const { records } = useSelector((state) => state.fetchData);
  const [selectedLab, setSelectedLab] = useState(null);
  const [openModalBooking, setOpenModalBooking] = useState(false);

  // UseEffect
  useEffect(() => {
    dispatch(fetchRecords({ booking: booking_id }));
  }, []);

  useEffect(() => {
    if (openModalBooking) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style = "";
    }
  }, [openModalBooking]);

  //   console.log(records);

  // function
  function handleBookingLab(item) {
    setSelectedLab(item);
    setOpenModalBooking(true);
  }

  async function b() {}

  return (
    <>
      <PatientHeader />
      {records && records.length > 0 ? (
        <>
          <div className="container mx-auto p-4 m-4 min-h-screen">
            <div className="flex flex-col gap-4 ">
              <PatientRecordInfor records={records} />
              {/* ------------------ kết quả kết luận của bác sĩ chuyên khoa --------------------- */}
              <div className="divider"></div>
              <div className="flex flex-col gap-4 p-4">
                <div className="w-full flex justify-center text-4xl m-4">
                  <span>Kết luận của bác sĩ chuyên khoa</span>
                </div>

                <div className=" shadow-2xl ">
                  {records && records[0].conclusionHtml && (
                    <div
                      className="prose lg:prose-xl p-4"
                      dangerouslySetInnerHTML={{
                        __html: records[0].conclusionHtml,
                      }}
                    ></div>
                  )}
                </div>
              </div>

              {/* --------------- Đăng ký lịch khám phòng khám lâm sàng------------------------ */}

              <PatientLabsTable {...{ records, handleBookingLab }} />

              {/* --------------- dach sách dịch vụ Chỉ định khám lâm sàng------------------------ */}

              <PatientTableLabServices
                {...{
                  serviceList: _.sortBy(records[0].labServices, (o) => {
                    return o.service.lab.name;
                  }),
                }}
              />

              {/* -------------------------------------------------- */}
            </div>
          </div>

          {selectedLab && (
            <ModalLabBooking
              {...{
                openModalBooking,
                setOpenModalBooking,
                selectedLab,
                record: records[0],
                services: _.filter(records[0].labServices, (o) => {
                  return o.service.lab._id === selectedLab._id;
                }),
              }}
            />
          )}

          <Footer />
        </>
      ) : (
        <>Không tìm thấy hồ sơ bệnh nhân</>
      )}
    </>
  );
}
