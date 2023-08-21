import Image from 'next/image';

function PostItem({ post }) {
  const imageContent = post.content.blocks.find(
    (block) => block.type === 'image',
  );
  const textContent = post.content.blocks.find(
    (block) => block.type === 'paragraph',
  );

  const imageUrl = imageContent ? imageContent.data.file.url : '';
  const textValue = textContent ? textContent.data.text : '';

  return (
    <div className='w-56 h-56 flex flex-col items-center justify-center bg-slate-300'>
      {imageUrl ? (
        <div className='h-4/5'>
          <Image src={imageUrl} alt={textValue} width={224} height={224} />
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
