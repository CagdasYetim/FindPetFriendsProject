using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace FindPetFriendsBackend.Data.Migrations
{
    public partial class EventUpdate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "EventCanJoin",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EventId = table.Column<int>(type: "integer", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventCanJoin", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventCanJoin_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EventIHave",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EventId = table.Column<int>(type: "integer", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventIHave", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventIHave_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EventCanJoin_EventId",
                table: "EventCanJoin",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EventIHave_EventId",
                table: "EventIHave",
                column: "EventId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventCanJoin");

            migrationBuilder.DropTable(
                name: "EventIHave");

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
    }
}
