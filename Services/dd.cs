// using Microsoft.AspNetCore.Mvc;
// using project.interfaces;
// using System.Collections.Generic;
// using project.Models;
// using project.Services;
// using System.Diagnostics;
// using Microsoft.AspNetCore.Authorization;
// using System.Security.Claims;
// using Microsoft.AspNetCore.Http.HttpResults;

// namespace project.Services
// {
//     public class LoginService : ILoginService
//     {
//         private readonly IUserService _userService;

//         public LoginService(IUserService userService)
//         {
//             _userService = userService;
//         }

//         public string Login(User User)
//         {
//             System.Console.WriteLine("LoginService");
//             List<User> users = _userService.GetAll();
//             User user = users.FirstOrDefault(user => user.Name == User.Name && user.Password == User.Password);

//             if (user == null)
//             {
//                 throw new UnauthorizedAccessException("user doesn`t exist!");
//             }
//             System.Console.WriteLine($"User: {user.Name} Login: {user.Password} Admin: {user.IsAdmin}");
//             var claims = new List<Claim>
//             {
//                 new Claim("type", "User"),
//                 new Claim("userId", user.Id.ToString())
//             };
//             if (user.IsAdmin)
//             {
//                 System.Console.WriteLine("I am Admin");
//                 claims.Add(new Claim("type", "Admin"));
//             }
//             var token = TokenService.GetToken(claims);
//             return TokenService.WriteToken(token);
//         }

//     }
// }