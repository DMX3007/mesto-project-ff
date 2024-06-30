import { Fetcher } from './fetcher';

const BASEURL = 'https://nomoreparties.co/v1/cohort-magistr-2/';
const fetcher = new Fetcher(BASEURL, process.env.API_TOKEN);

export const getUserData = async (title, desc, profileAvatarEl) => {
  try {
    const {
      name, about, avatar, _id,
    } = await fetcher.get('users/me');
    title.textContent = name;
    desc.textContent = about;
    profileAvatarEl.src = avatar;
    return _id;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
};

export const getCards = async () => {
  try {
    return await fetcher.get('cards');
  } catch (error) {
    console.error('Failed to fetch cards:', error);
  }
};

export const deleteCard = async (cardId) => {
  try {
    const res = await fetcher.delete(`cards/${cardId}`);
    return await res.json();
  } catch (error) {
    console.error('Failed to delete card:', error);
  }
};

export const sendCard = async (cardBody) => {
  try {
    const res = await fetcher.post('cards', cardBody);
    return await res.json();
  } catch (error) {
    console.error('Failed to send card:', error);
  }
};

export const addLike = async (cardId) => {
  try {
    const res = await fetcher.put(`cards/likes/${cardId}`);
    return await res.json();
  } catch (error) {
    console.error('Failed to add like:', error);
  }
};
export const removeLike = async (cardId) => {
  try {
    const res = await fetcher.delete(`cards/likes/${cardId}`);
    return await res.json();
  } catch (error) {
    console.error('Failed to remove like:', error);
  }
};

export const updateUserCredentials = async (body) => {
  try {
    const res = await fetcher.patch('users/me', body);
    return await res.json();
  } catch (error) {
    console.error('Failed to update user credentials:', error);
  }
};

export const changeAvatar = async (body) => {
  try {
    const res = await fetcher.patch('users/me/avatar', body);
    return res;
  } catch (error) {
    console.error('Failed to change avatar:', error);
  }
};
