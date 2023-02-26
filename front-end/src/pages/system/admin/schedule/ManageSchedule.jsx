import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../../components/AdminHeader";
import Err401Page from "../../../../components/Err401Page";

export default function ManageSchedule() {
  const { role } = useSelector((state) => state.user);

  return (
    <>
      <div>
        {role && role === "admin" ? (
          <>
            <AdminHeader />
            trang quan ly thời gian biểu
          </>
        ) : (
          <Err401Page />
        )}
      </div>
    </>
  );
}
