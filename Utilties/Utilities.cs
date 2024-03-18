using dotnet_core.Interface;
using dotnet_core.Service;

namespace dotnet_core.Utilities
{
    public static class Utilities
    {
        public static void AddTask(this IServiceCollection services)
        {
            services.AddSingleton<ITasksService, TasksService>();
        }
    }
}
