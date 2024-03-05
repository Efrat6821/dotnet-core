using Microsoft.AspNetCore.Mvc;
using dotnet_core.Models;
namespace dotnet_core.Controllers;

[ApiController]
[Route("[controller]")]


public class TasksController : ControllerBase
{

    private List<Tasks> arr;
    public TasksController()
    {
        arr = new List<Tasks>
        {
            new Tasks { Id = 1, Name = "moshe", Description = "to do homework", perform = false },
            new Tasks { Id = 2, Name = "Yaakov", Description = "go work", perform = false },
            new Tasks { Id = 3, Name = "Ysrael", Description = "go for a walk", perform = true }
        };

    }

    [HttpGet]
    public IEnumerable<Tasks> Get()
    {
        return arr;
    }

    [HttpGet("{id}")]
    public Tasks Get(int id)
    {
        return arr.FirstOrDefault(t => t.Id == id);
    }

    [HttpPost]
    public int Post(Tasks newTasks)
    {
        int max = arr.Max(p => p.Id);
        newTasks.Id = max + 1;
        arr.Add(newTasks);
        return newTasks.Id;
    }

    [HttpPut("{id}")]
    public void Put(int id, Tasks newTasks)
    {
        if (id == newTasks.Id)
        {
            var tasks = arr.Find(p => p.Id == id);
            if (tasks != null)
            {
                int index = arr.IndexOf(tasks);
                arr[index] = newTasks;
            }
        }
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        var tasks = arr.Find(p => p.Id == id);
        if (tasks != null)
        {
            arr.Remove(tasks);
        }
    }
}

