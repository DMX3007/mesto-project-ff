import { Fetcher } from './fetcher';

const BASEURL = 'https://nomoreparties.co/v1/cohort-magistr-2/';
const fetcher = new Fetcher(BASEURL, process.env.API_TOKEN);

export const getUserData = async (title, desc, profileAvatarEl) => {
  try {
    const res = await fetcher.get('users/me');
    if (res.ok) {
      const {
        name, about, avatar, _id,
      } = await res.json();
      title.textContent = name;
      desc.textContent = about;
      profileAvatarEl.src = avatar;
      return _id;
    } else {
      console.error('Failed to fetch user data:', res.statusText);
    }
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
};


export const getCards = async () => {
  try {
    const res = await fetcher.get('cards');
    if (res.ok) {
      return await res.json();
    } else {
      console.error('Failed to fetch cards:', res.statusText);
    }
  } catch (error) {
    console.error('Failed to fetch cards:', error);
  }
};

export const deleteCard = async (cardId) => {
  try {
    const res = await fetcher.delete(`cards/${cardId}`);
    if (res.ok) {
      return await res.json();
    } else {
      console.error('Failed to delete card:', res.statusText);
    }
  } catch (error) {
    console.error('Failed to delete card:', error);
  }
};

export const sendCard = async (cardBody) => {
  try {
    const res = await fetcher.post('cards', cardBody);
    if (res.ok) {
      return await res.json();
    } else {
      console.error('Failed to send card:', res.statusText);
    }
  } catch (error) {
    console.error('Failed to send card:', error);
  }
};

export const addLike = async (cardId) => {
  try {
    const res = await fetcher.put(`cards/likes/${cardId}`);
    if (res.ok) {
      return await res.json();
    } else {
      console.error('Failed to add like:', res.statusText);
    }
  } catch (error) {
    console.error('Failed to add like:', error);
  }
};
export const removeLike = async (cardId) => {
  try {
    const res = await fetcher.delete(`cards/likes/${cardId}`);
    if (res.ok) {
      return await res.json();
    } else {
      console.error('Failed to remove like:', res.statusText);
    }
  } catch (error) {
    console.error('Failed to remove like:', error);
  }
};

export const updateUserCredentials = async (body) => {
  try {
    const res = await fetcher.patch('users/me', body);
    if (res.ok) {
      return await res.json();
    } else {
      console.error('Failed to update user credentials:', res.statusText);
    }
  } catch (error) {
    console.error('Failed to update user credentials:', error);
  }
};

export const changeAvatar = async (body) => {
  try {
    const res = await fetcher.patch('users/me/avatar', body);
    if (res.ok) {
      return res;
    } else {
      console.error('Failed to change avatar:', res.statusText);
    }
  } catch (error) {
    console.error('Failed to change avatar:', error);
  }
};
