using System.Diagnostics;

// using System.Diagnostics;
// using System.IO;
// using Microsoft.AspNetCore.Http;

namespace MyMiddleware
{

    public class MyLogMiddleware
    {
        private const string V = "Data/file.txt";
        private readonly RequestDelegate next;
        // private readonly ILogger<MyLogMiddleware> logger;

        public MyLogMiddleware(RequestDelegate next/*, ILogger<MyLogMiddleware> logger*/)
        {
            this.next = next;
            // this.logger = logger;
        }

        public async Task Invoke(HttpContext c)
        {
            string message = $"{c.Request.Path}.{c.Request.Method}";
            var sw = new Stopwatch();
            sw.Start();
            message += $" started at {DateTime.Now:yyyy-MM-dd HH:mm:ss.fff}";
            // logger.LogInformation($"{act} started at {DateTime.Now:yyyy-MM-dd HH:mm:ss.fff}");
            await next.Invoke(c);
            string path = V;
            using (StreamWriter writer = File.AppendText(path))
            {
                await writer.WriteLineAsync(message);
            }
            // logger.LogDebug($"{act} ended at {sw.ElapsedMilliseconds} ms."
            // + $" User: {c.User?.FindFirst("userId")?.Value ?? "unknown"}");
        }
    }

    public static partial class MiddlewareExtensions
    {
        public static IApplicationBuilder UseMyLogMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<MyLogMiddleware>();
        }
    }
}



