using LibrarySystem.Api.Data;
using LibrarySystem.Api.Helpers;
using LibrarySystem.Api.Models.Domain;
using LibrarySystem.Api.Models.Dto.AuthorDtos;
using LibrarySystem.Api.Models.Dto.BookDtos;
using LibrarySystem.Api.Pagination;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibrarySystem.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookController : ControllerBase
    {
        [HttpGet]

        public IActionResult Get()
        {
            var data = _applicationDbContext.Books
                .Include(book => book.Author).Where(book => book.IsActive)
                .ToList();
            var response = data.Select(book => GetBookDto.Map(book)).ToList();
            return Ok(response);
        }


        [HttpGet]
        [Route("Page")]
        public IActionResult GetPage(int pageNumber, int pageSize, string? searchTerm)
        {
            var data = _applicationDbContext
                .Books
                .Include(book => book.Author)
                .Where(book => book.IsActive && (searchTerm == "" || searchTerm == null || book.Name.ToLower().Contains(searchTerm.ToLower())))
                .OrderBy(b => b.Name);

            var pageData = data.Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList()
                .Select(book => GetBookDto.Map(book))
                .ToList();

            var count = data.Count();

            var totalPages = (int)Math.Ceiling(count / (double)pageSize);
            var response = new PaginatedList<GetBookDto>(pageData, pageNumber, totalPages);

            return Ok(response);
        }



        [HttpGet]
        [Route("{id}")]

        public IActionResult Get(int id)
        {
            var book = _applicationDbContext.Books.Include(book => book.Author).Where(book => book.IsActive).FirstOrDefault(book=> book.Id == id);
            if(book == null)
            {
                return NotFound();
            }
            return Ok(GetBookDto.Map(book));
        }

        [HttpPost]

        public IActionResult Post(CreateBookDto book)
        {
            var author = _applicationDbContext.Authors.Find(book.AuthorId);
            if (author == null)
            {
                return BadRequest();
            }
            var bookToCreate = new Book
            {
                Name = book.Name,
                Isbn = book.Isbn,
                AuthorId = book.AuthorId,
                IsActive = true,
                CreatedAt = DateTime.Now
            };
            _applicationDbContext.Books.Add(bookToCreate);
            _applicationDbContext.SaveChanges();

            var createdBook = _applicationDbContext.Books.Include(x => x.Author).First(book => book.Id == bookToCreate.Id);
            return Ok(GetBookDto.Map(createdBook));
        }
        [HttpPut]
        [Route("{id}")]

        public IActionResult Put(int id, CreateBookDto book)
        {
            var bookToUpdate = _applicationDbContext.Books.Find(id);
            if (bookToUpdate == null)
            {
                return NotFound();
            }
            bookToUpdate.Name = book.Name;
            bookToUpdate.Isbn = book.Isbn;
            bookToUpdate.AuthorId = book.AuthorId;
            bookToUpdate.UpdateAt = DateTime.Now;
            _applicationDbContext.Books.Update(bookToUpdate);
            _applicationDbContext.SaveChanges();

            var updatedBook = _applicationDbContext.Books.Include(x=>x.Author).First(author => author.Id == id);
            return Ok(GetBookDto.Map(updatedBook));
        }

        [HttpDelete]
        [Route("{id}")]

        public IActionResult Delete(int id)
        {
            var bookToDelete = _applicationDbContext.Books.Find(id);
            if(bookToDelete == null)
            {
                return NotFound();
            }
            bookToDelete.UpdateAt = DateTime.Now;
            bookToDelete.IsActive = false;
            _applicationDbContext.Books.Update(bookToDelete);
            _applicationDbContext.SaveChanges();
            return Ok();
        }


        public BookController(ApplicationDbContext applicationDbContext)
        {
            this._applicationDbContext = applicationDbContext;
        }

        private readonly ApplicationDbContext _applicationDbContext;
    }
}
