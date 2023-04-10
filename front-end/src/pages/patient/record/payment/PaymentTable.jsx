import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Select from "react-select";
import { toast } from "react-toastify";

export default function PaymentTable(props) {
  const dispatch = useDispatch();
  // useState
  const [totalCost, setTotalCost] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // UseEffect
  useEffect(() => {
    let x = 0;
    props.labServices.map((item) => {
      x += +item.service.unitPrice * +item.quantity;
    });
    x += +props.clinicService.unitPrice;
    setTotalCost(x);
  }, []);

  useEffect(() => {
    if (openModal) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style = "";
    }
  }, [openModal]);

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

  async function b() {}

  return (
    <>
      <div className="divider"></div>
      <div className="p-4 m-4  flex flex-col items-center">
        <div className=" flex items-center text-4xl">Chi phí dịch vụ</div>
      </div>
      <div className="overflow-x-auto shadow-2xl">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Phòng khám</th>
              <th>Tên dịch vụ</th>
              <th>Số lượng</th>
              <th>Đơn giá (VNĐ)</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            <tr>
              <th>{props.clinic.name}</th>
              <td> {props.clinicService.name} </td>
              <td> 1 </td>
              <td>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(props.clinicService.unitPrice * 1000)}{" "}
              </td>
            </tr>
            {props.labServices.map((item, index) => {
              return (
                <tr key={index}>
                  <th>{item.service.lab.name}</th>
                  <td> {item.service.name} </td>
                  <td> 1 </td>
                  <td>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.service.unitPrice * 1000)}{" "}
                  </td>
                </tr>
              );
            })}
            <tr>
              <th></th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Tổng tiền</td>
              <td>
                {" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalCost * 1000)}{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-end pr-20">
        {!props.record.payment ? (
          <button
            className="btn btn-success w-40 p-4 m-4 "
            onClick={() => props.handlePayment(totalCost)}
          >
            Thanh toán
          </button>
        ) : (
          <>
            {/* The button to open modal */}
            <label
              htmlFor="modal-payment-info "
              className="btn btn-info mr-20"
              onClick={() => setOpenModal(true)}
            >
              Đã Thanh toán
            </label>

            {/* Put this part before </body> tag */}

            {openModal && (
              <>
                {" "}
                <input
                  type="checkbox"
                  id="modal-payment-info "
                  checked={openModal}
                  onChange={setOpenModal}
                  className="modal-toggle"
                />
                <div className="modal">
                  <div className="modal-box relative">
                    <label
                      htmlFor="modal-payment-info "
                      className="btn btn-sm btn-circle absolute right-2 top-2"
                      onClick={() => setOpenModal(false)}
                    >
                      ✕
                    </label>
                    <h3 className="text-lg font-bold">Thông tin giao dịch</h3>
                    <p className="py-4">
                      <table className="table w-full">
                        <tbody>
                          {/* row 1 */}
                          <tr>
                            <td> Mã giao dịch: </td>
                            <td> {props.record._id} </td>
                          </tr>
                          <tr>
                            <td> Số tiền: </td>
                            <td>
                              {" "}
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(props.record.payment.amount)}{" "}
                            </td>
                          </tr>
                          <tr>
                            <td> Nội dung thanh toán: </td>
                            <td> {props.record.payment.orderInfo} </td>
                          </tr>
                          <tr>
                            <td> Mã phản hồi (Response code): </td>
                            <td> {props.record.payment.responseCode} </td>
                          </tr>
                          <tr>
                            <td> Mã giao dịch tại VnPay: </td>
                            <td> {props.record.payment.transactionVnPayNo} </td>
                          </tr>
                          <tr>
                            <td> Mã ngân hàng: </td>
                            <td> {props.record.payment.bankCode} </td>
                          </tr>
                          <tr>
                            <td> Thời gian thanh toán: </td>
                            <td> {convertDate(props.record.payment.date)} </td>
                          </tr>
                          <tr>
                            <td> Kết quả giao dịch: </td>
                            <td>
                              {props.record.payment.responseCode === "00"
                                ? "Thành công"
                                : "Không thành công"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </p>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
