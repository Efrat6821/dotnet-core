namespace dotnet_core.Models;

public class Tasks
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public bool Perform { get; set; }
    public int UserId { get; set; }

}