using Microsoft.EntityFrameworkCore.Migrations;

namespace FindPetFriendsBackend.Data.Migrations
{
    public partial class EventUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Events",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Events");
        }
    }
}
