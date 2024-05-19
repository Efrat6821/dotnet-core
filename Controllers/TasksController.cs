using Microsoft.AspNetCore.Mvc;
using dotnet_core.Models;
using dotnet_core.Interface;
using Microsoft.AspNetCore.Authorization;

namespace dotnet_core.Controllers;

[ApiController]
[Route("[controller]")]

public class TasksController : ControllerBase
{

    private ITasksService tasksService;
    public TasksController(ITasksService tasksService)
    {
        this.tasksService = tasksService;

    }

    [HttpGet(Name = "GetAllTasks")]
    [Authorize(Policy = "Admin")]
    public ActionResult<IEnumerable<Tasks>> Get()
    {
        return tasksService.GetAll();
    }

    [HttpGet("user/{userId}", Name = "GetAllTasksByUser")]
    [Authorize(Policy = "User")]
    public ActionResult<IEnumerable<Tasks>> Get(int userId)
    {
        return tasksService.GetAllByUser(userId, "");
    }


    [HttpGet("{id, userId}", Name = "GetTaskById")]
    [Authorize(Policy = "User")]
    public ActionResult<Tasks> Get(int id, int userId)
    {
        var tasks = tasksService.GetAllByUser(userId, "");
        if (tasks != null)
        {
            var task = tasksService.Get(id);
            if (task == null)
                return NotFound();
            return Ok(task);
        }
        return NotFound();
    }

    [HttpPost]
    [Authorize(Policy = "User")]
    public IActionResult Post(Tasks newTask)
    {
        var newId = tasksService.Post(newTask);
        return CreatedAtAction(nameof(Post), new { id = newId }, newTask);
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "User")]
    public ActionResult Put(int id, Tasks newTask)
    {
        tasksService.Put(id, newTask);
        return Ok();
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "User")]
    public ActionResult Delete(int id)
    {
        tasksService.Delete(id);
        return Ok();
    }
}

