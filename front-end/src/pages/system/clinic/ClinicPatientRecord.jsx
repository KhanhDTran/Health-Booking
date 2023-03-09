import moment from "moment";
import "moment/locale/vi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ClinicHeader from "../../../components/ClinicHeader";
import { fetchRecords } from "../../../store/features/fetchDataSlice";
moment().format();
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { putRequestToast } from "../../../services/commonSv";

export default function ClinicPatientRecord() {
  const dispatch = useDispatch();
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  // useState
  const params = useParams();
  const { booking_id } = params;

  const { records } = useSelector((state) => state.fetchData);
  const [conclusion, setConclusion] = useState("");
  const [conclusionHtml, setConclusionHtml] = useState("");
  const [showConclusion, setShowConclusion] = useState(false);

  // UseEffect
  useEffect(() => {
    dispatch(fetchRecords({ booking: booking_id }));
  }, []);

  console.log(records);

  useEffect(() => {
    if (records) {
      setConclusion(records[0].conclusion);
      setConclusionHtml(records[0].conclusionHtml);
    }
  }, [records]);

  // function
  function handleEditorChange({ html, text }) {
    setConclusion(text);
    setConclusionHtml(html);
  }

  async function handleSaveConclusion() {
    await putRequestToast(
      "/clinic/edit-patient-record",
      {
        _id: records[0]._id,
        query: {
          conclusion,
          conclusionHtml,
        },
      },
      `Đang lưu kết luận...`
    );
  }

  return (
    <>
      <ClinicHeader />
      {records && records.length > 0 ? (
        <>
          {" "}
          <div className="container mx-auto p-4 m-4">
            <div className="flex flex-col gap-4">
              <div className="w-full flex justify-center text-4xl">
                <span>Chi tiết hồ sơ bệnh án</span>
              </div>
              <div className="card   w-full  shadow-2xl bg-base-100 p-4 m-4">
                <div className="avatar justify-center flex items-center">
                  <div className=" h-36 w-36 ">
                    <img
                      className="mask mask-circle bg-base-200 h-36 w-36"
                      src={records[0].booking.patient.image}
                    />
                  </div>
                </div>
                <div className="p-4 m-4 w-full not-prose flex grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="w-full">
                    <span>
                      Tên bệnh nhân: {records[0].booking.patient.name}{" "}
                    </span>
                  </div>
                  <div className="w-full">
                    <span>Giới tính: {records[0].booking.patient.gender} </span>
                  </div>
                  <div className="w-full">
                    <span>Sinh năm: {records[0].booking.patient.age} </span>
                  </div>
                  <div className="w-full">
                    <span> Địa chỉ: {records[0].booking.patient.address} </span>
                  </div>
                  <div className="w-full">
                    <span>
                      Số điện thoại: {records[0].booking.patient.phone}
                    </span>
                  </div>
                  <div className="w-full">
                    <span>Phòng khám: {records[0].booking.clinic.name} </span>
                  </div>
                  <div className="w-full">
                    <span>Số phòng: {records[0].booking.clinic.room} </span>
                  </div>
                  <div className="w-full">
                    <span>Giờ khám: {records[0].booking.hour} </span>
                  </div>
                  <div className="w-full">
                    <span>
                      Ngày khám:{" "}
                      {moment(records[0].booking.date).format("DD-MM-YYYY")}
                    </span>
                  </div>
                  <div className="w-full">
                    <span>Dịch vụ: {records[0].booking.services[0].name} </span>
                  </div>
                </div>
              </div>
              {/* --------------------------------------- */}

              <div className="divider"></div>

              <div className="w-full flex justify-center text-4xl">
                <span>Khám lâm sàng</span>
              </div>

              {/* --------------------------------------- */}

              <div className="divider"></div>
              <div className="w-full flex justify-center text-4xl">
                <span>Kết luận kết quả</span>
              </div>

              <div className="w-full flex justify-center text-4xl">
                <select
                  className="select select-info w-full max-w-xs "
                  onChange={(e) => {
                    console.log(e.target.value);
                    if (e.target.value === "1") setShowConclusion(false);
                    if (e.target.value === "2") setShowConclusion(true);
                  }}
                >
                  <option value={"1"}>Ẩn kết luận</option>
                  <option value={"2"}>Hiện kết luận</option>
                </select>
              </div>

              {showConclusion && (
                <>
                  {" "}
                  <MdEditor
                    className="m-4"
                    style={{
                      height: "600px",
                      width: "100%",
                    }}
                    value={conclusion}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                  />
                  <div className="w-full flex justify-center">
                    <button
                      className="btn btn-info w-40"
                      onClick={handleSaveConclusion}
                    >
                      Lưu kết luận{" "}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>Không tìm thấy hồ sơ bệnh nhân</>
      )}
    </>
  );
}
