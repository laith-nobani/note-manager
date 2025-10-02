using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Note_Project.Models;
using Note_Project.Services1;
namespace Note_Project.Controllers
{
    [Controller]
    [Route("[controller]")]
 
    public class AuthController(IAuthService authService) : Controller
    {
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody]RegisterDto dto)
        {
            var result = await authService.Register(dto);
            if (!result.IsAuthenticated)
            {
                return BadRequest("User already exists.");
            }
            return Ok(result);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody]LoginDto dto)
        {
            var result = await authService.Login(dto);
            if (!result.IsAuthenticated)
            {
                return Unauthorized("Invalid Info.");
            }
            return Ok(result);
        }
    }
}
