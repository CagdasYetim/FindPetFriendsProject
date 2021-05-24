using API.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class EventDto
    {
        [Required]
        public string From { get; set; }
        [Required]
        public string To { get; set; }
        public string City { get; set; }
        [Required]
        public string NameOfEvent { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        public ICollection<string> IHavesList { get; set; }
        public ICollection<string> CanJoinsList { get; set; }
        public int Id { get; set; }
        public int ToComeCount { get; set; }
        public bool AmIComing { get; set; }
    }
}
