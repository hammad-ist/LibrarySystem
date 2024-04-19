using System.ComponentModel;

namespace LibrarySystem.Api.Models.Dto.Auth
{
    public class LoginRequestDto
    {
        [DefaultValue("System")]
        public required string Username { get; set; }

        [DefaultValue("System")]
        public required string Password { get; set; }
    }
}
