using LibrarySystem.Api.Models.Domain;

namespace LibrarySystem.Api.Models.Dto
{
    public class AuthorDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }

        public static AuthorDto Map(Author author)
        {
            return new AuthorDto
            {
                Id = author.Id,
                Name = author.Name,
                Email = author.Email,
                DateOfBirth = author.DateOfBirth,
            };
        }
    }
}
