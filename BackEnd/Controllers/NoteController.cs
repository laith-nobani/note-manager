using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Note_Project.Models;
using Note_Project.Services1;

namespace Note_Project.Controllers
{
    [Controller]
    [Route("[controller]")]
    [Authorize]
    public class NoteController(INoteService noteService) : Controller
    {
        

        [HttpGet("GetNote")]

        public ActionResult<List<Note>> GetNote()
        {

            var notes = noteService.GetAllNotes().Result;
            if (notes == null || notes.Count == 0)
            {
                return NotFound("No notes found for the user.");
            }

            return Ok(notes);
           
        }
        [HttpGet("GetNoteById/{id}")]
        public ActionResult<Note> GetNoteById(int id)
        {
            var note = noteService.GetNoteById(id).Result;
            if (note == null)
            {
                return NotFound("Note not found or you are not authorized to view this note.");
            }
            return Ok(note);
        }

        [HttpPost("CreateNote")]
        public ActionResult<Note> CreateNote([FromBody] NoteDto noteDto)
        {
            var createdNote = noteService.CreateNote(noteDto).Result;

            return Ok(createdNote);
        }
        [HttpPut("UpdateNote/{id}")]
        public ActionResult<Note> UpdateNote(int id, [FromBody] NoteDto noteDto)
        {
            var updatedNote = noteService.UpdateNote(id, noteDto).Result;
            if (updatedNote == null)
            {
                return NotFound("Note not found or you are not authorized to update this note.");
            }
            return Ok(updatedNote);
        }

        [HttpDelete("DeleteNote/{id}")]
        public ActionResult DeleteNote(int id)
        {
            var isDeleted = noteService.DeleteNote(id).Result;
            if (!isDeleted)
            {
                return NotFound("Note not found or you are not authorized to delete this note.");
            }
            return Ok("Note deleted successfully.");
        }


    }
}
