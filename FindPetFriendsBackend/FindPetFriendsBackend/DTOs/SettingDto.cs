using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class SettingDto
    {
        public bool ShowName { get; set; }
        public bool ShowLastLocation { get; set; }
        public bool SendNotification { get; set; }
        public string City { get; set; }
        public ICollection<string> IHave { get; set; }
        public ICollection<string> CanJoin { get; set; }
    }
}
