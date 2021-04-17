using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Event
    {
        public int Id { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public float From { get; set; }
        public float To { get; set; }
        public string name { get; set; }
        public DateTime StartDate { get; set; }
    }
}
