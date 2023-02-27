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
