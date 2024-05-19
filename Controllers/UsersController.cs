using Microsoft.AspNetCore.Mvc;
using dotnet_core.Models;
using dotnet_core.Interface;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using dotnet_core.Service;

namespace dotnet_core.Controllers;
[Authorize(Policy = "Admin")]
[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{

    private IUsersService usersService;
    public UsersController(IUsersService usersService)
    {
        this.usersService = usersService;

    }

    [HttpGet]
    public ActionResult<IEnumerable<User>> Get()
    {
        return usersService.GetAll();
    }

    [HttpGet("{id}")]
    public ActionResult<User> Get(int id)
    {
        var user = usersService.Get(id);
        if (user == null)
            return NotFound();
        return Ok(user);
    }

    [HttpPost]
    public IActionResult Post(User newUser)
    {
        var newId = usersService.Post(newUser);
        return CreatedAtAction(nameof(Post), new { id = newId }, newUser);
    }


    [HttpPut("{id}")]
    public ActionResult Put(int id, User newUser)
    {
        usersService.Put(id, newUser);
        return Ok();
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        usersService.Delete(id);
        return Ok();
    }
}