using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class NotificationDto
    {
        [Required]
        public string Auth { get; set; }
        [Required]
        public string Endpoint { get; set; }
        [Required]
        public string P256dh { get; set; }
    }
}
