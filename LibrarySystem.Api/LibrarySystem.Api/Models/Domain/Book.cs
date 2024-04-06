namespace LibrarySystem.Api.Models.Domain
{
    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Isbn { get; set; }
        public int AuthorId { get; set; }

        public Author Author { get; set; }
    }
}
