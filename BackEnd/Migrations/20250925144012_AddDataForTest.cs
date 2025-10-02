using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Note_Project.Migrations
{
    /// <inheritdoc />
    public partial class AddDataForTest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "Id", "Content", "CreatedAt", "Title", "UpdatedAt", "UserId" },
                values: new object[] { 2, "This is a sample note.", new DateTime(2025, 9, 25, 16, 0, 0, 0, DateTimeKind.Unspecified), "Sample Note", new DateTime(2025, 9, 25, 16, 0, 0, 0, DateTimeKind.Unspecified), 2 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
