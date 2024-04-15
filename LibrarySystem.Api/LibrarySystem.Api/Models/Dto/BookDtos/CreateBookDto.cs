using System.ComponentModel.DataAnnotations;

namespace LibrarySystem.Api.Models.Dto.BookDtos
{
    public class CreateBookDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Isbn { get; set; }
        [Required]
        public int AuthorId { get; set; }
    }
}
