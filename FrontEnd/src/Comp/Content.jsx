export default function Content({ Title, Content, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg p-6 mb-4 shadow-lg border-l-4 border-blue-500 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
        {Title}
      </h1>
      <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
        {Content}
      </p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
