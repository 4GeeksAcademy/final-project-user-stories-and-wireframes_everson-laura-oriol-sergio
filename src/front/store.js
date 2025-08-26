export const initialStore = () => {
  return {
    theme: "dark",
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "switchTheme":
      return {
        ...store,
        theme: action.payload,
      };
    default:
      throw Error("Unknown action.");
  }
}