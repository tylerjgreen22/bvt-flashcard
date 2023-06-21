import axios from "axios";

const url = "http://localhost:3000";

export const getCategories = async () => {
  try {
    const res = await axios.get(`${url}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFlashcards = async (id: number) => {
  try {
    const res = await axios.get(`${url}/${id}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
