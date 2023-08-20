'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import EditorJS from '@editorjs/editorjs';
import ImageTool from '@editorjs/image';

function Editor({
  author,
  postId,
  title,
  content,
  saveError,
  setSaveError,
  isEditing,
}) {
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      data: content,
      tools: {
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'http://localhost:3000/api/v1/image/uploadFile',
            },
            types: 'image/*',
            captionPlaceholder: 'Enter caption',
          },
        },
      },
    });

    ref.current = editor;

    return () => {
      if (ref.current) {
        ref.current.destroy();
      }
    };
  }, [content]);

  const postSave = async () => {
    if (!title || !content.blocks.length) {
      setSaveError('제목과 내용을 모두 작성해주세요.');
      return;
    }

    if (ref.current) {
      try {
        const outputData = await ref.current.save();
        const postData = {
          title: title,
          author: author,
          content: outputData,
        };

        if (isEditing) {
          await axios.put(`/api/v1/posts/${postId}`, postData);
        } else {
          await axios.post('/api/v1/posts', postData);
        }

        router.push('/');
      } catch (error) {
        if (isEditing) {
          setSaveError('수정에 실패하였습니다. 다시 시도해주세요.');
        } else {
          setSaveError('저장에 실패하였습니다. 다시 시도해주세요.');
        }
      }
    }
  };

  return (
    <>
      <div className='border-2 border-black my-4'>
        <div id='editorjs' />
      </div>
      <div>
        <button
          onClick={postSave}
          className='text-xl text-white font-bold bg-[#0044ff] rounded-lg hover:bg-[#0000ff] py-2 px-8 w-full'
        >
          Save
        </button>
      </div>
      <div className='text-red-700 p-4'>{saveError}</div>
    </>
  );
}

export default Editor;
