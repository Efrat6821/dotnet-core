using dotnet_core.Models;

namespace dotnet_core.Interface;
public interface IUsersService
{
    //admin
    public List<User> GetAll();
    //log in
    public User Get(int id);
    //sign up
    public int Post(User newUser);
    //admin and user
    public void Put(int id, User newUser);
    //admin
    public void Delete(int id);
}