using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class EventIHave
    {
        public int Id { get; set; }
        public Event Event { get; set; }
        public int EventId { get; set; }
        public string Value { get; set; }
    }
}
