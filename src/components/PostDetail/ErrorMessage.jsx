function ErrorMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div className='bg-red-500 text-white px-4 py-2 rounded mb-6'>
      {message}
      <button onClick={onClose} className='ml-4'>
        X
      </button>
    </div>
  );
}

export default ErrorMessage;
