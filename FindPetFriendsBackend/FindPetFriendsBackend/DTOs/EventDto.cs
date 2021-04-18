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
        public string EventOwner { get; set; }
        [Required]
        public float From { get; set; }
        [Required]
        public float To { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string NameOfEvent { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
    }
}
