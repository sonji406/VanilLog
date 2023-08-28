import Image from 'next/image';

function PostItem({ post }) {
  const imageContent = post.content.blocks.find(
    (block) => block.type === 'image',
  );
  const textContent = post.content.blocks.find(
    (block) => block.type === 'paragraph',
  );

  const imageUrl = imageContent ? imageContent.data.file.url : '';
  const title = post.title;
  const textValue = textContent ? textContent.data.text : '';

  return (
    <div className='w-56 h-56 flex flex-col items-center justify-start '>
      <div class='w-56 h-56 card bg-white shadow-md transform transition-transform duration-200 hover:scale-105 hover:shadow-lg'>
        {imageUrl && (
          <Image
            className='w-4/5'
            src={imageUrl}
            alt={textValue}
            width={222}
            height={222}
          />
        )}
        <div class='card-text p-5'>
          <div class='card-title font-bold'>{title}</div>
          <div class='card-description text-sm text-gray-400 mt-2 truncate w-48'>
            {textValue}
          </div>
        </div>
      </div>
    </div>
  );
}

export { PostItem };
