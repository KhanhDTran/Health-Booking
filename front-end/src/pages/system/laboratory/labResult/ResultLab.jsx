import _ from "lodash";
import MarkdownIt from "markdown-it";
import React, { useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LabHeader from "../../../../components/LabHeader";
import { putRequestToast } from "../../../../services/commonSv";
import {
  fetchBookings,
  fetchResults,
} from "../../../../store/features/fetchDataSlice";
import { toBase64 } from "../../../../utils/CommonUtils";
import PatientResultInfo from "./PatientResultInfo";

export default function ResultLab() {
  const dispatch = useDispatch();
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  // useState
  const [images, setImages] = useState([]);

  const params = useParams();
  const { booking_id, record_id } = params;

  const { bookings, results } = useSelector((state) => state.fetchData);
  const { user } = useSelector((state) => state.user);
  const [result, setResult] = useState("");
  const [resultHtml, setResultHtml] = useState("");
  const [status, setStatus] = useState("");

  // UseEffect
  useEffect(() => {
    document.title = "Kết Quả Khám";
    window.scrollTo(0, 0);
    clearInput();
    dispatch(fetchBookings({ _id: booking_id }));
    dispatch(fetchResults({ record: record_id, lab: user.lab._id }));
  }, []);

  useEffect(() => {
    if (results && results.length > 0) {
      let images = results[0].images;
      let result = results[0].result;
      let resultHtml = results[0].resultHtml;
      setImages(images);
      setResult(result ? result : "");
      setResultHtml(resultHtml ? resultHtml : "");
    }
  }, [results]);

  useEffect(() => {
    if (bookings) setStatus(bookings[0].status);
  }, [bookings]);

  // function
  function handleEditorChange({ html, text }) {
    setResult(text);
    setResultHtml(html);
  }

  function clearInput() {
    setImages([]);
    setResult("");
    setResultHtml("");
  }

  function handleImgChange(files) {
    let list = [];
    Array.from(files).map(async (item) => {
      let base64 = await toBase64(item);
      if (base64) list.push(String(base64));
    });
    setTimeout(function () {
      setImages(list);
    }, 50);
  }

  async function saveResult() {
    await putRequestToast(
      "/lab/edit-result",
      {
        _id: results[0]._id,
        query: {
          result,
          resultHtml,
          images,
        },
      },
      `Đang lưu kết quả khám...`
    );
  }

  async function changeLabStatus() {
    await putRequestToast(
      "/lab/edit-lab-booking",
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

  return (
    <>
      <LabHeader />
      <div className="container mx-auto">
        {bookings && (
          <PatientResultInfo
            booking={bookings[0]}
            services={_.filter(bookings[0].record.labServices, function (o) {
              return o.service.lab === user.lab._id;
            })}
          />
        )}
        <div className="divider"></div>

        {/* ------- Result ------------- */}
        <>
          {/* -------------- Thay đổi trạng thái hồ sơ khám ------------------- */}
          {bookings && (
            <div className="flex justify-center flex-col items-center">
              <div className="text-3xl p-4 justify-center flex w-full">
                Thay đổi trạng thái hồ sơ khám
              </div>
              <div className="p-4 m-4">
                <span>Trạng thái hiện tại: {bookings[0].status} </span>
              </div>
              <div className="flex justify-center flex-col w-96">
                <select
                  className="select select-info w-full w-96"
                  value={status ? status : ""}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={"Đang khám"}>Đang khám</option>
                  <option value={"Đang đợi lấy mẫu"}>Đang đợi lấy mẫu</option>
                  <option value={"Đã lấy mẫu"}>Đã lấy mẫu</option>
                  <option value={"Đang đợi kết quả"}>Đang đợi kết quả</option>
                  <option value={"Đã có kết quả"}>Đã có kết quả</option>
                  <option value={"Đã khám xong"}>Đã khám xong</option>
                </select>
              </div>
              <div className="p-4 m-4">
                <button className="btn btn-info" onClick={changeLabStatus}>
                  Lưu trạng thái
                </button>
              </div>
              <div className="divider"></div>
            </div>
          )}

          {/* ---------------------- Kết quả khám ---------------------- */}
          <div className="text-3xl p-4 justify-center flex w-full">
            Kết quả khám
          </div>
          <div className="flex flex-col lg:flex-row justify-between mt-4">
            <div>
              <label className="label">
                <span className="label-text">Ảnh</span>
              </label>
              <input
                type="file"
                multiple
                className="file-input file-input-bordered file-input-info w-full max-w-xs"
                onChange={(e) => {
                  handleImgChange(e.target.files);
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {images.length > 0 &&
              images.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="w-60 h-40 bg-base-200 rounded-box">
                      <img src={item} alt="" className="rounded-box mt-2 " />
                    </div>
                  </div>
                );
              })}
          </div>
          <MdEditor
            className="m-4"
            style={{
              height: "600px",
              width: "100%",
            }}
            value={result}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
          <div className="w-full flex justify-center">
            <button className="btn btn-info w-40" onClick={saveResult}>
              Lưu kết quả{" "}
            </button>
          </div>
        </>
      </div>
    </>
  );
}
