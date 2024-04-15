using LibrarySystem.Api.Models.Domain;

namespace LibrarySystem.Api.Models.Dto.BookDtos
{
    public class GetBookDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Isbn { get; set; }
        public int AuthorId { get; set; }
        public string AuthorName { get; set; }

        public static GetBookDto Map(Book book)
        {
            return new GetBookDto
            {
                Id = book.Id,
                Name = book.Name,
                Isbn = book.Isbn,
                AuthorId = book.AuthorId,
                AuthorName = book.Author.Name
            };
        }
    }
}
