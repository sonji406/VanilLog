function Pagination({ pageNumber }) {
  return (
    <button
      type='button'
      className={`font-bold text-white bg-logo bg-indigo-500`}
    >
      {pageNumber}
    </button>
  );
}

export { Pagination };
