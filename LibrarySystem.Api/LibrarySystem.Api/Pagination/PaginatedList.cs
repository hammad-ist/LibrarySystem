namespace LibrarySystem.Api.Pagination
{
    public class PaginatedList<T>
    {
        public List<T> Items { get; }
        public int PageNumber { get; }
        public int TotalPages { get; }
        public bool HasPreviousPage => PageNumber > 1;
        public bool HasNextPage => PageNumber < TotalPages;

        public PaginatedList(List<T> items, int pageNumber, int totalPages)
        {
            Items = items;
            PageNumber = pageNumber;
            TotalPages = totalPages;
        }
    }
}
