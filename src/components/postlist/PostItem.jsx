import Image from 'next/image';

const postItemStyles = {
  container: 'w-56 h-56 flex flex-col items-center justify-center bg-slate-300',
  imageContainer: 'h-4/5',
  noImage: 'h-4/5 flex items-center justify-center',
  noImageText: 'text-lg font-bold',
  textContainer: 'flex items-center justify-center h-1/5 w-full bg-slate-400',
  textValue: 'inline-block truncate w-48',
};

function PostItem({ post }) {
  const imageContent = post.content.find((content) => content.type === 'image');
  const textContent = post.content.find((content) => content.type === 'text');
  const textValue = textContent ? textContent.value : '';

  return (
    <div className={postItemStyles.container}>
      {imageContent ? (
        <div className={postItemStyles.imageContainer}>
          <Image
            src={imageContent.value}
            alt={textValue}
            width={224}
            height={224}
          />
        </div>
      ) : (
        <div className={postItemStyles.noImage}>
          <span className={postItemStyles.noImageText}>No Image</span>
        </div>
      )}
      <div className={postItemStyles.textContainer}>
        <span className={postItemStyles.textValue}>{textValue}</span>
      </div>
    </div>
  );
}

export { PostItem };
