function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className='bg-red-500 text-white px-4 py-2 rounded mb-6'>
      {message}
      <button onClick={onDismiss} className='ml-4'>
        X
      </button>
    </div>
  );
}

export default ErrorMessage;
