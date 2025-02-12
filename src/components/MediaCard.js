const MediaCard = ({ media, onDelete }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img
        src={media}
        alt="Uploaded Media"
        className="w-full h-auto rounded-lg"
      />
      <button
        onClick={onDelete}
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default MediaCard;
