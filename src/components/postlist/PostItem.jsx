import Image from 'next/image';

function getRandomColor() {
  const colors = [
    'bg-[#FDEACA]',
    'bg-[#A8C9EA]',
    'bg-[#92DAD9]',
    'bg-[#ECA4A4]',
    'bg-[#F7E2E1]',
    'bg-[#7AA7D2]',
    'bg-[#DCE0EB]',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

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

  const randomColor = getRandomColor();

  return (
    <div className='w-[350px] h-[400px] flex flex-col items-center'>
      <div className='w-full h-full card bg-white transform transition-transform duration-200 hover:scale-105'>
        <div className='w-full h-[300px] relative'>
          {imageUrl ? (
            <Image
              className='object-cover'
              src={imageUrl}
              alt={textValue}
              layout='fill'
            />
          ) : (
            <div className={`w-full h-[300px] ${randomColor}`} />
          )}
        </div>
        <div className='p-4'>
          <div className='card-title text-2xl font-bold'>{title}</div>{' '}
          <div className='card-description text-base text-gray-400 mt-2 truncate w-full'>
            {textValue}
          </div>
        </div>
      </div>
    </div>
  );
}

export { PostItem };
