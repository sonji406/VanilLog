'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostList({ userId, page, limit }) {
  const queryParams = userId
    ? { userId: userId, page: page, limit: limit }
    : { page: page, limit: limit };

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/posts', {
          params: queryParams,
        });

        if (response.data.status === 'success') {
          setPosts(response.data.data);
        }

        if (response.data.status === '500') {
          setError('포스트를 불러오는 중 문제가 발생했습니다.');
        }
        if (response.data.status === '400') {
          setError('URL이 올바르지 않습니다.');
        }
      } catch (e) {
        setError('포스트를 불러오는 중 문제가 발생했습니다.');
      }
    };

    if (page && limit) {
      fetchData();
    }
  }, [userId, page, limit]);

  return;
}

export { PostList };
