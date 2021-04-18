using Microsoft.EntityFrameworkCore.Migrations;

namespace FindPetFriendsBackend.Data.Migrations
{
    public partial class UserEvents2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "name",
                table: "Events",
                newName: "NameOfEvent");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NameOfEvent",
                table: "Events",
                newName: "name");
        }
    }
}
