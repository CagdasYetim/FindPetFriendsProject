using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class EventCanJoin
    {
        public int Id { get; set; }
        public Event Event { get; set; }
        public int EventId { get; set; }
        public string Value { get; set; }
    }
}
