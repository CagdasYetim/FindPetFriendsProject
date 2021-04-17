using Microsoft.EntityFrameworkCore.Migrations;

namespace FindPetFriendsBackend.Data.Migrations
{
    public partial class UserProfile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "SendNotification",
                table: "AspNetUsers",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ShowLastLocation",
                table: "AspNetUsers",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ShowName",
                table: "AspNetUsers",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SendNotification",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ShowLastLocation",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ShowName",
                table: "AspNetUsers");
        }
    }
}
