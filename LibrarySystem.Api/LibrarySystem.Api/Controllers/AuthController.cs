using LibrarySystem.Api.Models.Dto.Auth;
using LibrarySystem.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace LibrarySystem.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post(LoginRequestDto model)
        {
            var response = await _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }
        public AuthController(IUserService userService)
        {
            this._userService = userService;
        }

        private readonly IUserService _userService;
    }
}
