using Microsoft.EntityFrameworkCore.Migrations;

namespace FindPetFriendsBackend.Data.Migrations
{
    public partial class EventExtension : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EventId",
                table: "IHave",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EventId",
                table: "CanJoin",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_IHave_EventId",
                table: "IHave",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_CanJoin_EventId",
                table: "CanJoin",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_CanJoin_Events_EventId",
                table: "CanJoin",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_IHave_Events_EventId",
                table: "IHave",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CanJoin_Events_EventId",
                table: "CanJoin");

            migrationBuilder.DropForeignKey(
                name: "FK_IHave_Events_EventId",
                table: "IHave");

            migrationBuilder.DropIndex(
                name: "IX_IHave_EventId",
                table: "IHave");

            migrationBuilder.DropIndex(
                name: "IX_CanJoin_EventId",
                table: "CanJoin");

            migrationBuilder.DropColumn(
                name: "EventId",
                table: "IHave");

            migrationBuilder.DropColumn(
                name: "EventId",
                table: "CanJoin");
        }
    }
}
