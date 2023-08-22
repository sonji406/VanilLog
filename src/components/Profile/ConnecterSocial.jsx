'use client';

function ConnectedSocial({ socialLoginType }) {
  return (
    <div className='mb-3'>
      <label className='font-bold'>연동된 소셜:</label>
      <div>{socialLoginType}</div>
    </div>
  );
}

export default ConnectedSocial;
