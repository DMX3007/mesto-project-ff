import { Fetcher } from "./fetcher";

const BASEURL = `https://nomoreparties.co/v1/cohort-magistr-2/`;
const fetcher = new Fetcher(BASEURL, process.env.API_TOKEN);

export const getUserData = async (title, desc, profileAvatarEl, currentUserId) => {
  const { name, about, avatar, _id } = await fetcher.get("users/me");
  title.textContent = name;
  desc.textContent = about;
  profileAvatarEl.src = avatar;
  return _id;
}

export const getCards = async () => {
  return await fetcher.get("cards");
}

export const deleteCard = async (cardId) => {
  const res = await fetcher.delete(`cards/${cardId}`);
  return await res.json();
}

export const sendCard = async (cardBody) => {
  const res = await fetcher.post(`cards`, cardBody);
  return await res.json();
}

export const addLike = async (cardId) => {
  const res = await fetcher.put(`cards/likes/${cardId}`);
  return await res.json();
}
export const removeLike = async (cardId) => {
  const res = await fetcher.delete(`cards/likes/${cardId}`);
  return await res.json();
}

export const updateUserCredentials = async (body) => {
  const res = await fetcher.patch('users/me', body)
  return await res.json();
}

export const changeAvatar = async (body) => {
  const res = await fetcher.patch('users/me/avatar', body)
  return res;
}
