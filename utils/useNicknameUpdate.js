import { useState, useEffect } from 'react';
import axios from 'axios';

export const useNicknameUpdate = (userId, initialNickname, toggleEditing) => {
  const [nickname, setNickname] = useState(initialNickname || '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (initialNickname) {
      setNickname(initialNickname);
    }
  }, [initialNickname]);

  const updateNickname = async () => {
    try {
      const response = await axios.put(`/api/v1/profile/${userId}`, {
        nickname,
      });
      if (response.data.status !== 200) {
        throw new Error(response.data.message);
      }
      setMessage('닉네임이 성공적으로 업데이트되었습니다');
      toggleEditing();
      return nickname;
    } catch (error) {
      setMessage(error.message);
    }
  };

  return { nickname, setNickname, message, updateNickname };
};
