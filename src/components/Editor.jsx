'use client';

import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import EditorJS from '@editorjs/editorjs';
import ImageTool from '@editorjs/image';
import LinkTool from '@editorjs/link';

function Editor({ title }) {
  const ref = useRef(null);

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

  const save = () => {
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
            category: 'Sample Category',
            author: '60d021446bbf4b001c8917e9', // Sample ObjectID for author
            content: content,
          };

          axios
            .post('/api/v1/posts', postData)
            .then((response) => {
              console.log('Post saved:', response.data);
            })
            .catch((error) => {
              console.error('Saving failed1: ', error);
            });
        })
        .catch((error) => {
          console.error('Saving failed2: ', error);
        });
    }
  };

  return (
    <div>
      <div id='editorjs' />
      <div className='border-t-2 border-gray-300'>
        <button onClick={save} className='w-full bg-gray-200'>
          Save
        </button>
      </div>
    </div>
  );
}

export default Editor;
