import axios from "axios";
import { toast } from "react-toastify";
import { instance } from "./instance";

export async function getRequest(api, data,) {
  try {
    let res = await instance.get(api, { params: data });
    return res.data;
  } catch (e) {
    console.log(res);
    return false;
  }
}

export async function postRequest(api, data,) {
  try {
    let res = await instance.post(api, data);
    return res.data;
  } catch (e) {
    console.log(res);
    return false;
  }
}

export async function deleteRequestToast(api, data, loading) {
  const toastId = toast.loading(loading);
  try {
    let res = await instance.delete(api, { params: data });
    toast.update(toastId, {
      render: res.data.msg,
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    return res.data;
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

export async function getRequestToast(api, data, loading) {
  const toastId = toast.loading(loading);
  try {
    let res = await instance.get(api, { params: data });
    toast.update(toastId, {
      render: res.data.msg,
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    return res.data;
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

export async function postRequestToast(api, data, loading) {
  const toastId = toast.loading(loading);
  try {
    let res = await instance.post(api, data);
    toast.update(toastId, {
      render: res.data.msg,
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    return res.data;
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

export async function putRequestToast(api, data, loading) {
  const toastId = toast.loading(loading);
  try {
    let res = await instance.put(api, data);
    toast.update(toastId, {
      render: res.data.msg,
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    return res.data;
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
