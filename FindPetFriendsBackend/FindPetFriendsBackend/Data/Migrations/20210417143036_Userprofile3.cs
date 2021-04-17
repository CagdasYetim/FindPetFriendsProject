using Microsoft.EntityFrameworkCore.Migrations;

namespace FindPetFriendsBackend.Data.Migrations
{
    public partial class Userprofile3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AppUserId1",
                table: "Wrapper",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Wrapper_AppUserId1",
                table: "Wrapper",
                column: "AppUserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Wrapper_AspNetUsers_AppUserId1",
                table: "Wrapper",
                column: "AppUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Wrapper_AspNetUsers_AppUserId1",
                table: "Wrapper");

            migrationBuilder.DropIndex(
                name: "IX_Wrapper_AppUserId1",
                table: "Wrapper");

            migrationBuilder.DropColumn(
                name: "AppUserId1",
                table: "Wrapper");
        }
    }
}
