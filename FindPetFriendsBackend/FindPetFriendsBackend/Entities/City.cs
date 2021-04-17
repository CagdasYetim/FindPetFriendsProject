using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class City
    {
        public int Id { get; set; }
        public string Country { get; set; }
        public string Name { get; set; }
        public float Lat { get; set; }
        public float Lng { get; set; }


    }
}
