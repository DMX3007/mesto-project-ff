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

export const updateLike = async (cardId) => {
  const res = await fetcher.put(`cards/${cardId}`);
  return await res.json();
}

export const updateUserCredentials = async (body) => {
  const res = await fetcher.patch('users/me', body)
  return await res.json();
}


// USER DATA
// const newProfileData = await fetch("https://nomoreparties.co/v1/cohort-magistr-2/users/me",{
//   method: 'PATCH',
//   headers: {
//     authorization: '26c1ae51-9801-4bd2-af04-f2b12b773d26',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Marie Skłodowska Curie',
//     about: 'Physicist and Chemist'
//   })
// });

