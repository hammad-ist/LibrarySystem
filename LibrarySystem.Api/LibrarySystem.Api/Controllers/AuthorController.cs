using LibrarySystem.Api.Data;
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

        public AuthorController(ApplicationDbContext applicationDbContext)
        {
            this._applicationDbContext = applicationDbContext;
        }

        private readonly ApplicationDbContext _applicationDbContext;
    }
}
