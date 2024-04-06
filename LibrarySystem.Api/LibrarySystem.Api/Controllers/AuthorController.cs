using LibrarySystem.Api.Data;
using LibrarySystem.Api.Models.Domain;
using LibrarySystem.Api.Models.Dto;
using Microsoft.AspNetCore.Mvc;

namespace LibrarySystem.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var data = _applicationDbContext.Authors.ToList();

            var response = data
                .Select(author => AuthorDto.Map(author))
                .ToList();

            return Ok(response);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id)
        {
            var author = _applicationDbContext.Authors.Find(id);

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
                DateOfBirth = author.DateOfBirth
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

            _applicationDbContext.Authors.Update(authorToUpdate);
            _applicationDbContext.SaveChanges();

            return Ok(AuthorDto.Map(authorToUpdate));
        }


        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id)
        {
            var authorToUpdate = _applicationDbContext.Authors.Find(id);
            if (authorToUpdate == null)
            {
                return NotFound();
            }

            _applicationDbContext.Authors.Remove(authorToUpdate);
            _applicationDbContext.SaveChanges();

            return NoContent();
        }

        public AuthorController(ApplicationDbContext applicationDbContext)
        {
            this._applicationDbContext = applicationDbContext;
        }

        private readonly ApplicationDbContext _applicationDbContext;
    }
}
