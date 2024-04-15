namespace LibrarySystem.Api.Models.Domain
{
    public class Book: BaseEntity
    {
        public string Name { get; set; }
        public string Isbn { get; set; }
        public int AuthorId { get; set; }

        public Author Author { get; set; }
    }
}
