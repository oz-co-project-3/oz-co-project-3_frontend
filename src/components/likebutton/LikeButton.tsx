import { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked(!liked);
  };
  return (
    <button onClick={handleClick}>
      {liked ? (
        <AiFillStar className='h-[30px] w-[30px] text-yellow-300' />
      ) : (
        <AiOutlineStar className='h-[30px] w-[30px] text-gray-500' />
      )}
    </button>
  );
};

export default LikeButton;
