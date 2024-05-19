using Microsoft.AspNetCore.Mvc;
using dotnet_core.Models;
using dotnet_core.Service;
using System.Text.Json;
using System.Security.Claims;

namespace dotnet_core.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        public string JsonData { get; set; }
        public List<User> Users { get; set; }
        public string JsonUrl = "Data/Users.json";

        public LoginController()
        {
            if (System.IO.File.Exists(JsonUrl))
            {
                JsonData = System.IO.File.ReadAllText(JsonUrl);
                Users = JsonSerializer.Deserialize<List<User>>(JsonData);
            }
            else
            {
                Users = new List<User>();
            }
        }

        [HttpPost(Name = "Login")]
        public ActionResult<string> Login([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User object is null");
            }

            if (string.IsNullOrEmpty(user.Name) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("User name or password is null or empty");
            }

            if (user.IsAdmin==true)
            {
                var claims = new List<Claim>
                {
                    new Claim("type", "Admin"),
                    new Claim("type", "User")
                };
                var token = TokenService.GetToken(claims);
                return new OkObjectResult(TokenService.WriteToken(token));
            }
            else
            {
                var existingUser = Users.Find(u => u.Name == user.Name);
                if (existingUser != null)
                {
                    var claims = new List<Claim>
                    {
                        new Claim("type", "User"),
                        // new Claim("FLName", user.Name)
                    };

                    var token = TokenService.GetToken(claims);
                    return new OkObjectResult(TokenService.WriteToken(token));
                }
                else
                {
                    return NotFound("User does not exist in the system");
                }
            }
        }
    }
}
