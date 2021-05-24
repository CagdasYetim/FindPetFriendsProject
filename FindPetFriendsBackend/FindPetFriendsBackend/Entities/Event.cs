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
        public string From { get; set; }
        public string To { get; set; }
        public string City { get; set; }
        public string NameOfEvent { get; set; }
        public ICollection<EventIHave> IHaves { get; set; }
        public ICollection<EventCanJoin> CanJoins { get; set; }
        public DateTime StartDate { get; set; }
        public ICollection<EventToCome> ToComes { get; set; }
    }
}
