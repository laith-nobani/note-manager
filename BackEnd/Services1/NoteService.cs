using Microsoft.EntityFrameworkCore;
using Note_Project.Context;
using Note_Project.Models;
using System.Security.Claims;

namespace Note_Project.Services1
{
    public class NoteService: INoteService
    { private readonly dbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger<NoteService> _logger;

        public NoteService(dbContext context, IHttpContextAccessor httpContextAccessor, ILogger<NoteService> logger)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
        }
        public Task<Note> CreateNote(NoteDto note)
        {
            Note newNote = new Note
            {
                Title = note.Title,
                Content = note.Content,
                UserId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value),
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };
            _context.Notes.Add(newNote);
            _context.SaveChanges();

            return Task.FromResult(newNote);
        }
        public Task<bool> DeleteNote(int id)
        {
            int IdUser = int.Parse(_httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var note = _context.Notes.FirstOrDefault(n => n.Id == id && n.UserId == IdUser);
            if (note == null)
            {
                return Task.FromResult(false);
            }
            _context.Notes.Remove(note);
            _context.SaveChanges();
            return Task.FromResult(true);
        }
        public Task<List<Note>> GetAllNotes()
        {
            int id= int.Parse(_httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            _logger.LogInformation("Fetching notes for user with ID: {UserId}", id);


            var Notes = _context.Notes.Where(n => n.UserId == id).ToList();

            if (Notes == null || Notes.Count==0)
            {
                return Task.FromResult(new List<Note>());

            }

            return Task.FromResult(Notes);
        }

        public Task<Note> GetNoteById(int id)
        {
            int IdUser = int.Parse(_httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var note = _context.Notes.FirstOrDefault(n => n.Id == id && n.UserId == IdUser);
            if (note == null)
            {
                return Task.FromResult<Note>(null);
            }
            return Task.FromResult(note);
        }

        public async Task<Note> UpdateNote(int id, NoteDto note)
        {
            int IdUser = int.Parse(_httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var note1 = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id && n.UserId == IdUser);
            if (note1 == null)
            {
                return null;
            }

            note1.Title = note1.Title;
            note1.Content = note.Content;
            note1.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return note1;
        }



    }
}
