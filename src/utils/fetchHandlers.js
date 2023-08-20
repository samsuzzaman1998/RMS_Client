import axios from "axios";
import useFetchConfig from "./useFetchConfig";

export const getAllHandler = async (url) => {
    const config = useFetchConfig();
    const response = await axios.get(url, config);
    return response?.data;
};

export const getSingleHandler = async ({ url, id }) => {
    const config = useFetchConfig();
    const response = await axios.get(`${url}/${id}`, config);
    return response.data;
};

export const postHandler = async ({ url, body }) => {
    const config = useFetchConfig();
    const response = await axios.post(url, body, config);
    return response.data.result;
};
