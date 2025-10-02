using Microsoft.EntityFrameworkCore;
using Note_Project.Models;
using System;
using System.Data;
using System.Security;

namespace Note_Project.Context
{
    public class dbContext:DbContext
    {
        public dbContext(DbContextOptions<dbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Note>().HasData(
            new Note
            {
             Id = 2,
             Title = "Sample Note",
             Content = "This is a sample note.",
             CreatedAt = new DateTime(2025, 9, 25, 16, 0, 0),  
             UpdatedAt = new DateTime(2025, 9, 25, 16, 0, 0), 
             UserId = 2
            }

     );


        }
        public DbSet<User> Users { get; set; }
        public DbSet<Note> Notes { get; set; }
        }
}
