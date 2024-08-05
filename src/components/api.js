import { Fetcher } from './fetcher'

const BASEURL = 'https://nomoreparties.co/v1/cohort-magistr-2/';
const fetcher = new Fetcher(BASEURL, process.env.API_TOKEN);

export const getUserData = async (
) => {
    const res = await fetcher.get('users/me');
    if (res.ok) {
      return await res.json();
    } else {
      return await Promise.reject(res.status);
    }
};


export const getCards = async () => {
    const res = await fetcher.get('cards');
    if (res.ok) {
      return await res.json();
    } else {
      return await Promise.reject(res.status);
    }
};

export const deleteCard = async (cardId) => {
    const res = await fetcher.delete(`cards/${cardId}`);
    if (res.ok) {
      return await res.json();
    } else {
      return await Promise.reject(res.status);
    }
};

export const sendCard = async (cardBody) => {
    const res = await fetcher.post('cards', cardBody);
    if (res.ok) {
      return await res.json();
    } else {
      return await Promise.reject(res.status);
    }
};

export const addLike = async (cardId) => {
    const res = await fetcher.put(`cards/likes/${cardId}`);
    if (res.ok) {
      return await res.json();
    } else {
      return await Promise.reject(res.status);
    }
};

export const removeLike = async (cardId) => {
    const res = await fetcher.delete(`cards/likes/${cardId}`);
    if (res.ok) {
      return await res.json();
    } else {
      return await Promise.reject(res.status);
    }
};

export const updateUserCredentials = async (body) => {
    const res = await fetcher.patch('users/me', body);
    if (res.ok) {
      return await res.json();
    } else {
      return await Promise.reject(res.status)
    }
};

export const changeAvatar = async (body) => {
    const res = await fetcher.patch('users/me/avatar', body);
    if (res.ok) {
      return res;
    } else {
      return await Promise.reject(res.status);
    }
};
