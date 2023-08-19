'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import EditorJS from '@editorjs/editorjs';
import ImageTool from '@editorjs/image';

function Editor({ title }) {
  const ref = useRef(null);
  const router = useRouter();

  const [error, setError] = useState(null);

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
    });

    ref.current = editor;

    return () => {
      if (ref.current) {
        ref.current.destroy();
      }
    };
  }, []);

  const postSave = () => {
    if (ref.current) {
      ref.current
        .save()
        .then((outputData) => {
          const content = outputData.blocks.map((block) => {
            return {
              type: block.type,
              value: block.data,
            };
          });

          const postData = {
            title: title,
            author: '60d021446bbf4b001c8917e9',
            content: content,
          };

          axios
            .post('/api/posts', postData)
            .then((response) => {
              router.push('/');
            })
            .catch((error) => {
              setError('저장에 실패하였습니다. 다시 시도해주세요.');
            });
        })
        .catch((error) => {
          setError('저장에 실패하였습니다. 다시 시도해주세요.');
        });
    }
  };

  return (
    <div>
      <div id='editorjs' />
      <div className='border-t-2 border-gray-300'>
        <button onClick={postSave} className='w-full bg-gray-200'>
          Save
        </button>
      </div>
    </div>
  );
}

export default Editor;
