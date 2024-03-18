
using dotnet_core.Models;

namespace dotnet_core.Interface;
public interface ITasksService
{
    public List<Tasks> GetAll();
    public Tasks Get(int id);
    public int Post(Tasks newTask);
    public void Put(int id, Tasks newTask);
    public void Delete(int id);
}