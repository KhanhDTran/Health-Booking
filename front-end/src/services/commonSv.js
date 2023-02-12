import axios from "axios";
import { toast } from "react-toastify";
import { instance } from "./instance";

export async function getData(api, data, loading) {
  const toastId = toast.loading(loading);
  try {
    let res = await instance.get(api, { params: data });
    toast.update(toastId, {
      render: res.data.msg,
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    return res.data.data;
  } catch (e) {
    toast.update(toastId, {
      render: e.response.data.msg,
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
    return false;
  }
}

export async function postData(api, data, loading) {
  const toastId = toast.loading(loading);
  try {
    let res = await instance.post(api, data);
    toast.update(toastId, {
      render: res.data.msg,
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    return true;
  } catch (e) {
    toast.update(toastId, {
      render: e.response.data.msg,
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
    return false;
  }
}
