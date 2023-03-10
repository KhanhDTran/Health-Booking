import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ClinicHeader from "../../../components/ClinicHeader";
import { fetchRecords } from "../../../store/features/fetchDataSlice";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { putRequestToast } from "../../../services/commonSv";
import LabIndicating from "./LabIndicating";
import PatientRecordInfor from "./PatientRecordInfor";

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
  const [showLabIndicating, setShowLabIndicating] = useState(false);

  // UseEffect
  useEffect(() => {
    dispatch(fetchRecords({ booking: booking_id }));
  }, []);

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
              <PatientRecordInfor records={records} />
              {/* --------------- Chỉ định khám lâm sàng------------------------ */}

              <div className="divider"></div>

              <div className="w-full flex justify-center text-4xl">
                <span>Chỉ định khám lâm sàng</span>
              </div>
              <div className="w-full flex justify-center text-4xl">
                <select
                  className="select select-info w-full max-w-xs "
                  onChange={(e) => {
                    if (e.target.value === "1") setShowLabIndicating(false);
                    if (e.target.value === "2") setShowLabIndicating(true);
                  }}
                >
                  <option value={"1"}>Ẩn chỉ định khám lâm sàng</option>
                  <option value={"2"}>Hiện chỉ định khám lâm sàng</option>
                </select>
              </div>
              {showLabIndicating && (
                <LabIndicating {...{ record: records[0] }} />
              )}

              {/* ------------------ kết luận kết quả --------------------- */}

              <div className="divider"></div>
              <div className="w-full flex justify-center text-4xl">
                <span>Kết luận kết quả</span>
              </div>

              <div className="w-full flex justify-center text-4xl">
                <select
                  className="select select-info w-full max-w-xs "
                  onChange={(e) => {
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
