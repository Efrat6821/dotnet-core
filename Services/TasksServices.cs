using dotnet_core.Models;
using dotnet_core.Interface;

namespace dotnet_core.Service;


public class TasksService : ITasksService
{
    private List<Tasks> arr;
   public TasksService()
    {
        arr = new List<Tasks>
        {
            new Tasks { Id = 1, Name = "moshe", Description = "to do homework", Perform = false },
            new Tasks { Id = 2, Name = "Yaakov", Description = "go work", Perform = false },
            new Tasks { Id = 3, Name = "Ysrael", Description = "go for a walk", Perform = true }
        };
    }

    public List<Tasks> GetAll() => arr;

    public Tasks Get(int id)
    {
        return arr.FirstOrDefault(t => t.Id == id);
    }


    public int Post(Tasks newTask)
    {
        int max = arr.Max(p => p.Id);
        newTask.Id = max + 1;
        arr.Add(newTask);
        return newTask.Id;
    }

    public void Put(int id, Tasks newTask)
    {
        if (id == newTask.Id)
        {
            var task = arr.Find(p => p.Id == id);
            if (task != null)
            {
                int index = arr.IndexOf(task);
                arr[index] = newTask;
            }
        }
    }
    public void Delete(int id)
    {
        var task = arr.Find(p => p.Id == id);
        if (task != null)
        {
            arr.Remove(task);
        }
    }
}