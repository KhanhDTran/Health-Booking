import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _, { result } from "lodash";
import Select from "react-select";
import { toast } from "react-toastify";
import LabHeader from "../../../../components/LabHeader";
import PatientResultInfo from "./PatientResultInfo";
import {
  fetchBookings,
  fetchResults,
} from "../../../../store/features/fetchDataSlice";
import { useParams } from "react-router-dom";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { putRequestToast } from "../../../../services/commonSv";
import { toBase64 } from "../../../../utils/CommonUtils";

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

  // UseEffect
  useEffect(() => {
    document.title = "Danh Sách Đang Khám";
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

  console.log(results);

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

  // async function handleExamined() {
  //   await putRequestToast(
  //     "/lab/examined-booking",
  //     {
  //       _id: results[0]._id,
  //       query: {
  //         result,
  //         resultHtml,
  //         images,
  //       },
  //     },
  //     `Đang lưu kết quả khám...`
  //   );
  // }

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
          {" "}
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
