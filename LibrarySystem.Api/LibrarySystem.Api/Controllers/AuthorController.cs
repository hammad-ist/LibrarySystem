using LibrarySystem.Api.Data;
using LibrarySystem.Api.Models.Domain;
using LibrarySystem.Api.Models.Dto.AuthorDtos;
using LibrarySystem.Api.Pagination;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

namespace LibrarySystem.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var data = _applicationDbContext
                .Authors
                .Where(author => author.IsActive)
                .ToList();

            var response = data.Select(x => AuthorDto.Map(x));
            return Ok(response);
        }

        [HttpGet]
        [Route("Page")]
        public IActionResult GetPage(int pageNumber, int pageSize, string? searchTerm)
        {
            var data = _applicationDbContext
                .Authors
                .Where(author => author.IsActive && (searchTerm == "" || searchTerm == null || author.Name.ToLower().Contains(searchTerm.ToLower())))
                .OrderBy(b => b.Name);

            var pageData = data.Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList()
                .Select(author => AuthorDto.Map(author))
                .ToList();

            var count = data.Count();

            var totalPages = (int)Math.Ceiling(count / (double)pageSize);
            var response = new PaginatedList<AuthorDto>(pageData, pageNumber, totalPages);

            return Ok(response);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id)
        {
            var author = _applicationDbContext.Authors.Where(author => author.IsActive).FirstOrDefault(author => author.Id == id);

            if (author == null)
            {
                return NotFound();
            }

            return Ok(AuthorDto.Map(author));
        }

        [HttpPost]
        public IActionResult Post(CreateAuthorDto author)
        {
            var authorToCreate = new Author
            {
                Name = author.Name,
                Email = author.Email,
                DateOfBirth = author.DateOfBirth,
                IsActive = true,
                CreatedAt = DateTime.Now
            };

            _applicationDbContext.Authors.Add(authorToCreate);
            _applicationDbContext.SaveChanges();

            return Ok(AuthorDto.Map(authorToCreate));
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult Put(int id, CreateAuthorDto author)
        {
            var authorToUpdate = _applicationDbContext.Authors.Find(id);
            if (authorToUpdate == null)
            {
                return NotFound();
            }

            authorToUpdate.Name = author.Name;
            authorToUpdate.Email = author.Email;
            authorToUpdate.DateOfBirth = author.DateOfBirth;
            authorToUpdate.IsActive = true;
            authorToUpdate.UpdateAt = DateTime.Now;

            _applicationDbContext.Authors.Update(authorToUpdate);
            _applicationDbContext.SaveChanges();

            return Ok(AuthorDto.Map(authorToUpdate));
        }


        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id)
        {
            var authorToDelete = _applicationDbContext.Authors.Find(id);
            if (authorToDelete == null)
            {
                return NotFound();
            }
            
            authorToDelete.UpdateAt = DateTime.Now;
            authorToDelete.IsActive = false;
            _applicationDbContext.Authors.Update(authorToDelete);
            _applicationDbContext.SaveChanges();

            return Ok();
        }

        public AuthorController(ApplicationDbContext applicationDbContext)
        {
            this._applicationDbContext = applicationDbContext;
        }

        private readonly ApplicationDbContext _applicationDbContext;
    }
}
