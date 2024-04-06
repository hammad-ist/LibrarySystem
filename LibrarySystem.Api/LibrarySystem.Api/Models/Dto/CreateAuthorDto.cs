using System.ComponentModel.DataAnnotations;

namespace LibrarySystem.Api.Models.Dto
{
    public class CreateAuthorDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
    }
}
