using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class EventToCome
    {
        public int Id { get; set; }
        public Event Event { get; set; }
        public int EventId { get; set; }
        public int Value { get; set; }
    }
}
