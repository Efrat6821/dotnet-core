using dotnet_core.Models;
using dotnet_core.Interface;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System;
using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;

namespace dotnet_core.Service;


public class TasksService : ITasksService
{
    // private List<Tasks> arr;
    public List<Tasks> arr { get; }
    private string filePath;

    public TasksService(IWebHostEnvironment webHost)
    {
        this.filePath = Path.Combine(webHost.ContentRootPath, "Data", "Tasks.json");
        using (var jsonFile = File.OpenText(filePath))
        {
            arr = JsonSerializer.Deserialize<List<Tasks>>(jsonFile.ReadToEnd());
        }
    }

    private void saveToFile()
    {
        File.WriteAllText(filePath, JsonSerializer.Serialize(arr));
    }

    public List<Tasks> GetAll() => arr;

    public Tasks Get(int id) => arr.FirstOrDefault(t => t.Id == id);


    public int Post(Tasks newTask)
    {
        int max = arr.Max(p => p.Id);
        newTask.Id = max + 1;
        arr.Add(newTask);
        saveToFile();
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
        saveToFile();
    }
    public void Delete(int id)
    {
        var task = arr.Find(p => p.Id == id);
        if (task != null)
        {
            arr.Remove(task);
        }
        saveToFile();
    }
}