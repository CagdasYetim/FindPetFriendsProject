using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class UserNotification
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Auth { get; set; }
        public string Endpoint { get; set; }
        public string P256dh { get; set; }
    }
}
