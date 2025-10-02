using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Note_Project.Context;
using Note_Project.Models;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace Note_Project.Services1
{
    public class AuthService : IAuthService
    {
        private readonly dbContext _context;
        private readonly IConfiguration _config;
        private readonly ILogger<AuthService> _logger;

        public AuthService(dbContext context, IConfiguration config, ILogger<AuthService> logger)
        {
            _context = context;
            _config = config;            _logger = logger;

        }

        public async Task<AuthModel> Login(LoginDto login)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == login.Username);
            if (user == null)
            {
                return new AuthModel
                {
                    Username = login.Username,
                    Email = string.Empty,
                    IsAuthenticated = false,
                    Token = string.Empty
                };
            }

            var token = GenerateToken(user);

            return new AuthModel
            {
                Username = user.Username,
                Email = user.Email,
                IsAuthenticated = true,
                Token = token
            };
        }

        public async Task<AuthModel> Register(RegisterDto registerDto)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == registerDto.Email || u.Username == registerDto.Username);
            if (existingUser != null)
            {
                return new AuthModel
                {
                    Username = registerDto.Username,
                    Email = registerDto.Email,
                    IsAuthenticated = false,
                    Token = string.Empty
                };
            }


            var newUser = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password)
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            var token = GenerateToken(newUser);

            return new AuthModel
            {
                Username = newUser.Username,
                Email = newUser.Email,
                IsAuthenticated = true,
                Token = token
            };
        }

        public string GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SigningKey"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(int.Parse(_config["Jwt:LifeTime"])),
            signingCredentials: creds
        );


            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
