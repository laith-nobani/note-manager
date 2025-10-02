namespace Note_Project.Models
{
    public class AuthModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public bool IsAuthenticated { get; set; }
    }
}
