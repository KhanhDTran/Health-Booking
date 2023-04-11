import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ClinicHeader from "../../../../components/ClinicHeader";
import { putRequestToast } from "../../../../services/commonSv";
import {
  fetchBookings,
  fetchRecords,
  fetchResults,
} from "../../../../store/features/fetchDataSlice";
import PreBooking from "../../../patient/record/PreBooking";
import ModalDetailResult from "../../../patient/record/result/ModalDetailResult";
import RecordResults from "../../../patient/record/result/RecordResults";
import ClinicMedicine from "../medicine/ClinicMedicine";
import ClinicRecordStatus from "./ClinicRecordStatus";
import LabIndicating from "./LabIndicating";
import PatientRecordInfor from "./PatientRecordInfor";
import ConclusionRecord from "./conclusionRecord";

export default function ClinicPatientRecord() {
  const dispatch = useDispatch();
  // useState
  const params = useParams();
  const { booking_id } = params;

  const { records, results, bookings } = useSelector(
    (state) => state.fetchData
  );
  const [conclusion, setConclusion] = useState("");
  const [conclusionHtml, setConclusionHtml] = useState("");
  const [showConclusion, setShowConclusion] = useState(false);
  const [showMedicine, setShowMedicine] = useState(false);
  const [showLabIndicating, setShowLabIndicating] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [reExamineDate, setReExamineDate] = useState("");

  // UseEffect
  useEffect(() => {
    document.title = "Chi Tiết Hồ Sơ Bệnh Án";
    window.scrollTo(0, 0);
    dispatch(fetchRecords({ booking: booking_id }));
    dispatch(fetchBookings({ _id: booking_id }));
  }, []);

  useEffect(() => {
    if (records) {
      setConclusion(records[0].conclusion);
      setConclusionHtml(records[0].conclusionHtml);
      setReExamineDate(records[0].reExamine ? records[0].reExamine.date : "");
    }
    if (records && records.length > 0) {
      dispatch(fetchResults({ record: records[0]._id }));
    }
  }, [records]);

  useEffect(() => {
    if (selectedResult) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style = "";
    }
  }, [selectedResult]);

  // function
  function handleEditorChange({ html, text }) {
    setConclusion(text);
    setConclusionHtml(html);
  }

  function handleShowResult(item) {
    setSelectedResult(item);
  }

  async function handleSaveConclusion() {
    await putRequestToast(
      "/clinic/edit-patient-record",
      {
        _id: records[0]._id,
        query: {
          conclusion,
          conclusionHtml,
          reExamine: reExamineDate
            ? {
                date: reExamineDate,
              }
            : null,
        },
      },
      `Đang lưu kết luận...`
    );
  }

  async function addMedicine(name, quantity, note) {
    if (!name || !quantity) {
      toast.warning("Thiếu thông tin thuốc");
    } else {
      let medicines = _.filter(records[0].medicines);
      medicines.push({ name, quantity, note });
      let res = await putRequestToast(
        "/clinic/edit-patient-record",
        {
          _id: records[0]._id,
          query: {
            medicines,
          },
        },
        `Đang lưu thêm thuốc...`
      );
      if (res) dispatch(fetchRecords({ booking: booking_id }));
    }
  }

  async function changeClinicRecordStatus(status) {
    await putRequestToast(
      "/clinic/edit-booking",
      {
        _id: booking_id,
        query: {
          status,
        },
      },
      `Đang lưu trạng thái hồ sơ...`
    );
    dispatch(fetchBookings({ _id: booking_id }));
  }
  async function deleteMedicine(item) {
    if (confirm(`Có chắc muốn xoá thuốc ${item.name}`)) {
      let medicines = _.filter(records[0].medicines, function (o) {
        return o.name !== item.name;
      });
      let res = await putRequestToast(
        "/clinic/edit-patient-record",
        {
          _id: records[0]._id,
          query: {
            medicines,
          },
        },
        `Đang xoá thuốc...`
      );
      if (res) dispatch(fetchRecords({ booking: booking_id }));
    }
  }

  return (
    <>
      <ClinicHeader />
      {records && records.length > 0 ? (
        <>
          <div className="container mx-auto p-4 m-4">
            <div className="flex flex-col gap-4">
              {/* ------------------ record infor -----------------------  */}

              <PatientRecordInfor records={records} />

              {/* ------------------ Status ------------------------------  */}

              {records && bookings && (
                <ClinicRecordStatus
                  {...{
                    record: records[0],
                    booking: bookings[0],
                    changeClinicRecordStatus,
                  }}
                />
              )}

              {bookings && bookings[0].preBooking && (
                <PreBooking
                  {...{
                    booking: bookings[0],
                    preBooking: bookings[0].preBooking,
                    user: "clinic",
                  }}
                />
              )}

              {/* ------------------ kết luận kết quả --------------------- */}
              {records && bookings && (
                <ConclusionRecord
                  {...{
                    setShowConclusion,
                    showConclusion,
                    handleEditorChange,
                    handleSaveConclusion,
                    conclusion,
                    reExamineDate,
                    setReExamineDate,
                    reExamine: records[0].reExamine,
                  }}
                />
              )}

              {/* ------------------ Kê thuốc ------------------------- */}

              {records && (
                <ClinicMedicine
                  {...{
                    record: records[0],
                    showMedicine,
                    setShowMedicine,
                    deleteMedicine,
                    addMedicine,
                  }}
                />
              )}

              {/* -------------------- Kết quả khám lâm sàng ---------------- */}
              <RecordResults {...{ results, handleShowResult }} />
              {selectedResult && (
                <ModalDetailResult {...{ selectedResult, setSelectedResult }} />
              )}

              {/* --------------- Chỉ định khám lâm sàng------------------------ */}

              <LabIndicating
                {...{
                  record: records[0],
                  setShowLabIndicating,
                  showLabIndicating,
                }}
              />

              {/* -------------------------------------------------- */}
            </div>
          </div>
        </>
      ) : (
        <>Không tìm thấy hồ sơ bệnh nhân</>
      )}
    </>
  );
}
