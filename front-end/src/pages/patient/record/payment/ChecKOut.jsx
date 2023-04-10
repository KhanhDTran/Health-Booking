import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Select from "react-select";
import { toast } from "react-toastify";
import { putRequestToast } from "../../../../services/commonSv";

export default function CheckOut() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    document.title = "Kết Quả Giao Dịch";
    window.scrollTo(0, 0);
    updatePaymentRecord();
  }, []);
  // useState

  const queryParameters = new URLSearchParams(window.location.search);

  // console.log(vnp_TransactionNo);

  // function
  function convertDate(dateString) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const hour = dateString.substring(8, 10);
    const minute = dateString.substring(10, 12);
    const second = dateString.substring(12, 14);

    const date =
      hour + ":" + minute + ":" + second + " " + day + "-" + month + "-" + year;

    return date;
  }

  async function updatePaymentRecord() {
    if (queryParameters.get("vnp_ResponseCode") === "00") {
      await putRequestToast("/clinic/edit-patient-record", {
        _id: queryParameters.get("vnp_TxnRef"),
        query: {
          payment: {
            responseCode: queryParameters.get("vnp_ResponseCode"),
            amount: queryParameters.get("vnp_Amount") / 100,
            orderInfo: queryParameters.get("vnp_OrderInfo"),
            transactionVnPayNo: queryParameters.get("vnp_TransactionNo"),
            bankCode: queryParameters.get("vnp_BankCode"),
            date: queryParameters.get("vnp_PayDate"),
          },
        },
      });
    }
  }

  return (
    <>
      <div className="container mx-auto flex flex-col p-4">
        <div className="w-full flex items-center text-4xl text-center  justify-center">
          Kết quả giao dịch
        </div>
        <div className="flex justify-center">
          <div className="overflow-x-auto m-4 ">
            <table className="table w-full">
              <tbody>
                {/* row 1 */}
                <tr>
                  <td> Mã giao dịch: </td>
                  <td> {queryParameters.get("vnp_TxnRef")} </td>
                </tr>
                <tr>
                  <td> Số tiền: </td>
                  <td>
                    {" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(queryParameters.get("vnp_Amount") / 100)}{" "}
                  </td>
                </tr>
                <tr>
                  <td> Nội dung thanh toán: </td>
                  <td> {queryParameters.get("vnp_OrderInfo")} </td>
                </tr>
                <tr>
                  <td> Mã phản hồi (Response code): </td>
                  <td> {queryParameters.get("vnp_ResponseCode")} </td>
                </tr>
                <tr>
                  <td> Mã giao dịch tại VnPay: </td>
                  <td> {queryParameters.get("vnp_TransactionNo")} </td>
                </tr>
                <tr>
                  <td> Mã ngân hàng: </td>
                  <td> {queryParameters.get("vnp_BankCode")} </td>
                </tr>
                <tr>
                  <td> Thời gian thanh toán: </td>
                  <td> {convertDate(queryParameters.get("vnp_PayDate"))} </td>
                </tr>
                <tr>
                  <td> Kết quả giao dịch: </td>
                  <td>
                    {queryParameters.get("vnp_ResponseCode") === "00"
                      ? "Thành công"
                      : "Không thành công"}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center p-4 m-4">
              <button
                className="btn btn-info w-40"
                onClick={() => {
                  navigate("/patient/records/");
                }}
              >
                Trở lại
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
