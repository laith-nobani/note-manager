import { useEffect, useState } from "react";
import Content from "../Comp/Content";
import CreateContent from "../Comp/CreateContent";

export default function Home() {
  const [renderData, setRenderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false); 
  const fetchData = async () => {
    try {
      const token1 = localStorage.getItem("token");
      const res = await fetch("http://localhost:3002/Note/GetNote", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token1}`,
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      setError(null);
      setEmpty(false);

      const result = await fetchData();

      if (Array.isArray(result) && result.length > 0) {
        setRenderData(result);
      } else {
        setRenderData([]);
        setEmpty(true); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("No Notes Found For You");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const UpdateContent = async (id, oldText) => {
    const newText = prompt("Edit your content:", oldText); 
    if (!newText) return;
    try {
      const token1 = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3002/Note/UpdateNote/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token1}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newText }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      await refreshData();
    } catch (e) {
      console.log(e);
    }
  };

  const DeleteContent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const token1 = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3002/Note/DeleteNote/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token1}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      await refreshData();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <CreateContent refreshData={refreshData} />

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
            Your Notes
          </h2>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center">
              {error}
            </div>
          )}

          {!loading && !error && empty && (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">
                No notes found. Create your first note above!
              </p>
            </div>
          )}

          {!loading && !error && !empty && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderData.map((e) => (
                <div key={e.id} className="mb-4">
                  <Content
                    Title={e.title}
                    Content={e.content}
                    onEdit={() => UpdateContent(e.id, e.content)}
                    onDelete={() => DeleteContent(e.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
