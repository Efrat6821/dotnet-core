using Microsoft.AspNetCore.Mvc;
using dotnet_core.Models;
using dotnet_core.Interface;

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

    [HttpGet]
    public ActionResult<IEnumerable<Tasks>> Get()
    {
        return tasksService.GetAll();
    }

    [HttpGet("{id}")]
    public ActionResult<Tasks> Get(int id)
    {
        var task = tasksService.Get(id);
        if (task == null)
            return NotFound();
        return Ok(task);
    }

    [HttpPost]
    public IActionResult Post(Tasks newTask)
    {
        var newId = tasksService.Post(newTask);
        return CreatedAtAction(nameof(Post), new { id = newId }, newTask);
    }

    [HttpPut("{id}")]
    public ActionResult Put(int id, Tasks newTask)
    {
        tasksService.Put(id, newTask);
        return Ok();
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        tasksService.Delete(id);
        return Ok();
    }
}

