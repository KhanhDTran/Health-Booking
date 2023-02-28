import _ from "lodash";

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const customStyles = {
  control: (base, state) => ({
    ...base,
    height: 46,
    minHeight: 35,
    with: 200,
    // borderColor: state.isFocused ? "yellow" : "red",
  }),
};

export function convertToSelectOptions(array) {
  let list = [];
  _.forEach(array, function (item) {
    list.push({ value: item._id, label: item.name });
  });
  return list;
}

export const timeListAm = [
  { lab: null, clinic: null, hour: "6:00 - 6:30", date: "", isOn: false },
  { lab: null, clinic: null, hour: "6:30 - 7:00", date: "", isOn: false },
  { lab: null, clinic: null, hour: "7:00 - 7:30", date: "", isOn: false },
  { lab: null, clinic: null, hour: "7:30 - 8:00", date: "", isOn: false },
  { lab: null, clinic: null, hour: "8:00 - 8:30", date: "", isOn: false },
  { lab: null, clinic: null, hour: "8:30 - 9:00", date: "", isOn: false },
  { lab: null, clinic: null, hour: "9:00 - 9:30", date: "", isOn: false },
  { lab: null, clinic: null, hour: "9:30 - 10:00", date: "", isOn: false },
  { lab: null, clinic: null, hour: "10:00 - 10:30", date: "", isOn: false },
  { lab: null, clinic: null, hour: "10:30 - 11:00", date: "", isOn: false },
  { lab: null, clinic: null, hour: "11:00 - 11:30", date: "", isOn: false },
  { lab: null, clinic: null, hour: "11:30 - 12:00", date: "", isOn: false },
];

export const timeListPM = [
  { lab: null, clinic: null, hour: "12:00 - 12:30", date: "", isOn: false },
  { lab: null, clinic: null, hour: "12:30 - 13:00", date: "", isOn: false },
  { lab: null, clinic: null, hour: "13:00 - 13:30", date: "", isOn: false },
  { lab: null, clinic: null, hour: "13:30 - 14:00", date: "", isOn: false },
  { lab: null, clinic: null, hour: "14:00 - 14:30", date: "", isOn: false },
  { lab: null, clinic: null, hour: "14:30 - 15:00", date: "", isOn: false },
  { lab: null, clinic: null, hour: "15:00 - 15:30", date: "", isOn: false },
  { lab: null, clinic: null, hour: "15:30 - 16:00", date: "", isOn: false },
  { lab: null, clinic: null, hour: "16:00 - 16:30", date: "", isOn: false },
  { lab: null, clinic: null, hour: "16:30 - 17:00", date: "", isOn: false },
  { lab: null, clinic: null, hour: "17:00 - 17:30", date: "", isOn: false },
  { lab: null, clinic: null, hour: "17:30 - 18:00", date: "", isOn: false },
];

export const timeListNight = [
  { lab: null, clinic: null, hour: "18:00 - 18:30", date: "", isOn: false },
  { lab: null, clinic: null, hour: "18:30 - 19:00", date: "", isOn: false },
  { lab: null, clinic: null, hour: "19:00 - 19:30", date: "", isOn: false },
  { lab: null, clinic: null, hour: "19:30 - 20:00", date: "", isOn: false },
  { lab: null, clinic: null, hour: "20:00 - 20:30", date: "", isOn: false },
  { lab: null, clinic: null, hour: "20:30 - 21:00", date: "", isOn: false },
  { lab: null, clinic: null, hour: "21:00 - 21:30", date: "", isOn: false },
  { lab: null, clinic: null, hour: "21:30 - 22:00", date: "", isOn: false },
];
