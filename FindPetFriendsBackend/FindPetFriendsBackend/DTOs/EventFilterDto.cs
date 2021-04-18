using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class EventFilterDto
    {
        public string NameOfEvent { get; set; }
        public ICollection<string> InCities { get; set; }
        public ICollection<string> WithBreeds { get; set; }
        public DateTime DateOfEvent { get; set; }
    }
}
