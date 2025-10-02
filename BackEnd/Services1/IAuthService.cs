using Note_Project.Models;

namespace Note_Project.Services1
{
    public interface IAuthService
    {
        string GenerateToken(User user);
        Task<AuthModel> Register(RegisterDto registerDto);
        Task<AuthModel> Login(LoginDto login);
    }
}
