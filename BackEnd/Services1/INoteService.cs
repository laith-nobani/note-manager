using Note_Project.Models;

namespace Note_Project.Services1
{
    public interface INoteService
    {

        Task<Note> CreateNote(NoteDto note);       
        Task<Note> GetNoteById(int id);
        Task<List<Note>> GetAllNotes();
        Task<Note> UpdateNote(int id, NoteDto note);
        Task<bool> DeleteNote(int id);
    }
}
