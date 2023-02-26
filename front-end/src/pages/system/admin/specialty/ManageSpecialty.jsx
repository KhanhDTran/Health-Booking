import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../../components/AdminHeader";
import Err401Page from "../../../../components/Err401Page";

export default function ManageSpecialty() {
  const { role } = useSelector((state) => state.user);

  return (
    <>
      <div>
        {role && role === "admin" ? (
          <>
            <AdminHeader />
            trang quan ly chuyên khoa y tế
          </>
        ) : (
          <Err401Page />
        )}
      </div>
    </>
  );
}
