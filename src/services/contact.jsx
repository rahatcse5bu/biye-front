import axios from "axios";
import { baseUrl } from "../utils/url";

const getContactByUser = async (token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.get(baseUrl + `/contact/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const updateContact = async (updatedData, token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.put(baseUrl + `/contact`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};

const createContact = async (data, token) => {
  if (!token) {
    return null;
  }
  const contact = await axios.post(baseUrl + "/contact", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return contact.data;
};
const createContactUsByEmail = async (data) => {
  const contact = await axios.post(baseUrl + "/contact/send-email", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return contact.data;
};

const getContactForBuyer = async (userId, bioId, token) => {
  if (!userId || !bioId || !token) {
    return null;
  }
  const response = await axios.get(
    baseUrl + `/contact/bio-contact/${userId}/${bioId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

export const ContactServices = {
  getContactForBuyer,
  getContactByUser,
  updateContact,
  createContact,
  createContactUsByEmail,
};
