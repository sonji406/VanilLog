import Image from 'next/image';

function PostItem({ post }) {
  const imageContent = post.content.find((content) => content.type === 'image');
  const textContent = post.content.find((content) => content.type === 'text');
  const textValue = textContent ? textContent.value : '';

  return (
    <div className='w-56 h-56 flex flex-col items-center justify-center bg-slate-300'>
      {imageContent ? (
        <div className='h-4/5'>
          <Image
            src={imageContent.value}
            alt={textValue}
            width={224}
            height={224}
          />
        </div>
      ) : (
        <div className='h-4/5 flex items-center justify-center'>
          <span className='text-lg font-bold'>No Image</span>
        </div>
      )}
      <div className='flex items-center justify-center h-1/5 w-full bg-slate-400'>
        <span className='inline-block truncate w-48'>{textValue}</span>
      </div>
    </div>
  );
}

export { PostItem };
