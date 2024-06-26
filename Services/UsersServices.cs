using dotnet_core.Models;
using dotnet_core.Interface;
// using System.Collections.Generic;
// using System.Linq;
// using System.IO;
// using System;
// using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
// using Microsoft.AspNetCore.Hosting;

namespace dotnet_core.Service;


public class UsersService : IUsersService
{
    // private List<Tasks> arr;
    public List<User> arr { get; }
    private string filePath;

    public UsersService(IWebHostEnvironment webHost)
    {
        this.filePath = Path.Combine(webHost.ContentRootPath, "Data", "Users.json");
        using (var jsonFile = File.OpenText(filePath))
        {
            arr = JsonSerializer.Deserialize<List<User>>(jsonFile.ReadToEnd()
            //  new JsonSerializerOptions
            //  {
            //      PropertyNameCaseInsensitive = true
            //  }
             );
        }
    }

    private void saveToFile()
    {
        File.WriteAllText(filePath, JsonSerializer.Serialize(arr));
    }

    public List<User> GetAll() => arr;

    public User Get(int id) => arr.FirstOrDefault(u => u.Id == id);

    public int GenerateIDFromPassword(string password)
    {
        int id = 0;
        int i = 1;
        foreach (char c in password)
        {
            id += (int)c * i;
            i++;
        }
        return id;
    }

    public int Post([FromBody] User newUser)
    {
        newUser.Id = GenerateIDFromPassword(newUser.Password);
        arr.Add(newUser);
        saveToFile();
        return newUser.Id;
    }

    public void Put(int id, User newUser)
    {
        if (id == newUser.Id)
        {
            var user = arr.Find(p => p.Id == id);
            if (user != null)
            {
                int index = arr.IndexOf(user);
                if (arr[index].Password != newUser.Password)
                    newUser.Id = GenerateIDFromPassword(newUser.Password);
                arr[index] = newUser;
            }
        }
        saveToFile();
    }
    public void Delete(int id)
    {
        var user = arr.Find(p => p.Id == id);
        if (user != null)
        {
            arr.Remove(user);
        }
        saveToFile();
    }
}