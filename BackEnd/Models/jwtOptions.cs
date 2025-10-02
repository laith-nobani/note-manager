namespace Note_Project.Models
{
    public class jwtOptions
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string LifeTime { get; set; }
        public string SigningKey { get; set; }
    }
}
