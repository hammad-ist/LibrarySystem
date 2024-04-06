namespace LibrarySystem.Api.Models.Domain
{
    public class Author
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }

        public IEnumerable<Book> Books { get; set; }
    }
}
