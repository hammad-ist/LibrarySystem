using LibrarySystem.Api.Models.Domain;
using LibrarySystem.Api.Models.Dto.Auth;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LibrarySystem.Api.Data;
using Microsoft.EntityFrameworkCore;
using LibrarySystem.Api.Models;
using Microsoft.Extensions.Options;

namespace LibrarySystem.Api.Services
{
    public interface IUserService
    {
        Task<LoginResponseDto?> Authenticate(LoginRequestDto model);
        Task<IEnumerable<User>> GetAll();
        Task<User?> GetById(int id);
        Task<User?> AddAndUpdateUser(User userObj);
    }
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _db;
        private readonly AppSettings _appSettings;


        public UserService(IOptions<AppSettings> appSettings, ApplicationDbContext db)
        {
            _appSettings = appSettings.Value;
            _db = db;
        }

        public async Task<LoginResponseDto?> Authenticate(LoginRequestDto model)
        {
            var user = await _db.Users.SingleOrDefaultAsync(x => x.Username == model.Username && x.PasswordHash == model.Password);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = await GenerateJwtToken(user);

            return new LoginResponseDto(user, token);
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _db.Users.Where(x => x.IsActive == true).ToListAsync();
        }

        public async Task<User?> GetById(int id)
        {
            return await _db.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<User?> AddAndUpdateUser(User userObj)
        {
            bool isSuccess = false;
            if (userObj.Id > 0)
            {
                var obj = await _db.Users.FirstOrDefaultAsync(c => c.Id == userObj.Id);
                if (obj != null)
                {
                    // obj.Address = userObj.Address;
                    obj.FirstName = userObj.FirstName;
                    obj.LastName = userObj.LastName;
                    _db.Users.Update(obj);
                    isSuccess = await _db.SaveChangesAsync() > 0;
                }
            }
            else
            {
                await _db.Users.AddAsync(userObj);
                isSuccess = await _db.SaveChangesAsync() > 0;
            }

            return isSuccess ? userObj : null;
        }
        // helper methods
        private async Task<string> GenerateJwtToken(User user)
        {
            //Generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = await Task.Run(() =>
            {
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                return tokenHandler.CreateToken(tokenDescriptor);
            });

            return tokenHandler.WriteToken(token);
        }
    }
}
